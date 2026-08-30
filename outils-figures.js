/* =====================================================================
   OUTILS-FIGURES.JS -- Boîte à outils de création de figures et blocs
   (L'Atelier des Maths)

   Extrait de index.html (markup de #toolsModalOverlay) et app.js
   (logique) pour alléger ces deux fichiers -- même pattern que
   admin.js. Regroupe TOUS les mini-outils utilisables dans le
   contenu des exercices (Évaluation) et des corrections projetées :
   éditeur de formule (Σ/∫/lim/frac), texte libre, mini tableau
   interactif, division posée/décimale, axe gradué, repère, disque et
   rectangle de fractions, graphique, statistiques, cubes empilés,
   probabilités (urne/cartes/dés/arbre), et figure géométrique libre
   (points/segments/droites/cercles/angles + codages).

   Chargé en <script defer> APRÈS app.js, dont ce fichier dépend :
   addPendingBlock, setToolContext, pendingBlocksHTML, escapeHtml,
   katexSpan, renderMathText, currentUser, currentChapterTitle,
   callClaude, figState (déclaré dans app.js, réassigné ici).

   L'IIFE initFigureDrag() en fin de fichier attache les listeners de
   drag sur #figureSvg : elle DOIT s'exécuter après l'injection HTML
   ci-dessous (donc rester dans ce fichier, après elle, et non dans
   app.js où #figureSvg n'existerait pas encore au moment de
   l'exécution).
   ===================================================================== */

document.body.insertAdjacentHTML('beforeend', `
<div id="toolsModalOverlay" class="modal-overlay" style="display:none;" onclick="if(event.target===this) closeAllToolPanels();">
  <div class="modal-card" style="max-width:97vw;width:97vw;max-height:95vh;overflow:auto;">
    <div id="textBlockPanel" class="figure-wrap" style="display:none;">
      <p class="hint" style="margin:0 0 10px;">Texte libre avec la même mise en forme automatique que l'énoncé principal (fractions, exposants, racines, **gras**, {{couleur|texte}}...).</p>
      <div class="tool-row" style="margin:0 0 8px;">
        <button type="button" class="btn secondary" onclick="openFormulaBuilder()"><span class=gicon>calculate</span> Éditeur de formule (Σ, lim, ∫, fraction, puissance, racine...)</button>
      </div>
      <textarea id="textBlockInput" oninput="previewTextBlock()" rows="4" style="width:100%;font-family:'JetBrains Mono',monospace;font-size:.9rem;padding:10px;border-radius:8px;border:1px solid rgba(28,43,57,.2);box-sizing:border-box;" placeholder="Ex. Calcule 3/4 + 1/2 et donne le résultat sous forme irréductible."></textarea>
      <div id="textBlockPreview" style="margin-top:8px;"></div>
      <p class="hint" style="margin:8px 0 0;">Astuce : les fractions <code>a/b</code> et <code>sqrt(x)</code> se mettent en forme automatiquement. Pour une somme, une limite ou une intégrale (boutons Σ/lim/∫ ci-dessus), du LaTeX est inséré directement entre <code>$...$</code> -- modifie-le librement, y compris pour des expressions complexes (fractions imbriquées, plusieurs fonctions...), ça reste toujours fiable.</p>
      <div class="figure-toolbar" style="margin-top:10px;">
        <button type="button" class="btn" onclick="insertTextBlock()">Insérer le texte</button>
        <button type="button" class="btn secondary" onclick="closeTextBlockTool()">Fermer sans insérer</button>
      </div>
    </div>
    <div id="imagePanel" class="figure-wrap" style="display:none;">
      <p class="hint" style="margin:0 0 10px;">Importer une image (photo, capture d'écran, figure scannée...) à insérer dans le contenu.</p>
      <input type="file" id="imageImportInput" accept="image/*" style="display:none;" onchange="previewImportedImage(this.files[0])">
      <div class="tool-row" style="margin:0 0 8px;">
        <button type="button" class="btn secondary" onclick="document.getElementById('imageImportInput').click()"><span class=gicon>photo_camera</span> Choisir une image</button>
      </div>
      <div id="imageImportPreview" style="margin-top:4px;"></div>
      <div class="figure-toolbar" style="margin-top:10px;">
        <button type="button" class="btn" id="imageImportInsertBtn" onclick="insertImageBlock()" disabled>Insérer l'image</button>
        <button type="button" class="btn secondary" onclick="closeImageTool()">Fermer sans insérer</button>
      </div>
    </div>
    <div id="formulaBuilderOverlay" class="modal-overlay" style="display:none;" onclick="if(event.target===this) closeFormulaBuilder();">
      <div class="modal-card" style="max-width:600px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
          <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.05rem;"><span class=gicon>calculate</span> Éditeur de formule</strong>
          <button class="modal-close" onclick="closeFormulaBuilder()"><span class=gicon>close</span></button>
        </div>
        <p class="hint" style="margin:0 0 10px;">Clique dans une case puis choisis un symbole : il vient se placer à cet endroit précis. Chaque case peut à son tour contenir une nouvelle structure (imbrication libre).</p>
        <div class="tool-row" style="margin-bottom:12px;">
          <button type="button" class="btn secondary" onclick="fbInsertAtFocus('frac')" title="Fraction">▭/▭</button>
          <button type="button" class="btn secondary" onclick="fbInsertAtFocus('pow')" title="Puissance">x²</button>
          <button type="button" class="btn secondary" onclick="fbInsertAtFocus('sub')" title="Indice">x₂</button>
          <button type="button" class="btn secondary" onclick="fbInsertAtFocus('sqrt')" title="Racine carrée">√</button>
          <button type="button" class="btn secondary" onclick="fbInsertAtFocus('sum')" title="Somme">Σ</button>
          <button type="button" class="btn secondary" onclick="fbInsertAtFocus('int')" title="Intégrale">∫</button>
          <button type="button" class="btn secondary" onclick="fbInsertAtFocus('lim')" title="Limite">lim</button>
        </div>
        <div id="formulaBuilderCanvas" style="border:1px solid rgba(28,43,57,.2);border-radius:8px;padding:16px;min-height:60px;font-size:1.1rem;background:#fff;line-height:2.2;"></div>
        <p class="hint" style="margin:8px 0 0;">Le <span class=gicon>close</span> à côté d'une structure la retire. Une case restée vide est simplement ignorée à l'insertion.</p>
        <div class="figure-toolbar" style="margin-top:14px;">
          <button type="button" class="btn" onclick="fbInsertFinal()">Insérer cette formule</button>
          <button type="button" class="btn secondary" onclick="closeFormulaBuilder()">Annuler</button>
        </div>
      </div>
    </div>
    <div id="tableauPanel" class="figure-wrap" style="display:none;">
      <div class="tool-row" style="margin-bottom:10px;">
        <label class="hint" style="margin:0;">Colonnes : <input type="number" id="tabCols" value="3" min="1" max="8" style="width:60px;"></label>
        <label class="hint" style="margin:0;">Lignes : <input type="number" id="tabRows" value="3" min="1" max="12" style="width:60px;"></label>
        <button type="button" class="btn secondary" onclick="buildTableauGrid()">Générer la grille</button>
      </div>
      <div id="tableauGrid" style="overflow-x:auto;"></div>
      <div class="figure-toolbar" style="margin-top:10px;">
        <button type="button" class="btn" onclick="insertTableau()">Insérer le tableau</button>
        <button type="button" class="btn secondary" onclick="closeTableauTool()">Fermer sans insérer</button>
      </div>
    </div>
    <div id="divisionGroupWrap" style="display:none;">
    <div class="tool-group-tabs" style="display:flex;gap:6px;margin-bottom:10px;">
      <button type="button" class="tool-tab-btn" id="divTabEucl" onclick="openDivisionTool()">Division euclidienne</button>
      <button type="button" class="tool-tab-btn" id="divTabDec" onclick="openDivisionDecTool()">Division décimale</button>
    </div>
    <div id="divisionPanel" class="figure-wrap" style="display:none;">
      <p class="hint" style="margin:0 0 10px;">Indiquez le dividende et le diviseur : la division posée est calculée et mise en forme automatiquement.</p>
      <div class="tool-row" style="margin-bottom:10px;">
        <input type="number" id="divDividende" placeholder="Dividende (ex. 823)" style="width:160px;">
        <input type="number" id="divDiviseur" placeholder="Diviseur (ex. 14)" style="width:160px;">
        <button type="button" class="btn secondary" onclick="previewDivisionPosee()">Calculer</button>
      </div>
      <div id="divisionPreview"></div>
      <label class="hint" style="display:block;margin:10px 0 0;"><input type="checkbox" id="divStepByStep"> Insérer le détail étape par étape (plutôt que le résultat final seul)</label>
      <label class="hint" style="display:block;margin:6px 0 0;"><input type="checkbox" id="divShowDiff" checked onchange="previewDivisionPosee()"> Afficher les différences (détail des soustractions -- décochez pour ne garder que les restes successifs)</label>
      <label class="hint" style="display:block;margin:6px 0 0;"><input type="checkbox" id="divVierge"> N'afficher que le dividende et le diviseur (à compléter par l'élève -- la hauteur de la barre est calculée pour laisser la place aux étapes)</label>
      <div class="figure-toolbar" style="margin-top:10px;">
        <button type="button" class="btn" onclick="insertDivisionPosee()">Insérer la division posée</button>
        <button type="button" class="btn secondary" onclick="closeDivisionTool()">Fermer sans insérer</button>
      </div>
    </div>
    <div id="divisionDecPanel" class="figure-wrap" style="display:none;">
      <p class="hint" style="margin:0 0 10px;">Division d'un nombre entier par un nombre entier, poursuivie après la virgule (valeur exacte ou approchée).</p>
      <div class="tool-row" style="margin-bottom:10px;">
        <input type="text" inputmode="decimal" id="divDecDividende" placeholder="Dividende (ex. 10,5)" style="width:160px;">
        <input type="number" id="divDecDiviseur" placeholder="Diviseur (ex. 8)" style="width:160px;">
        <label class="hint" style="margin:0;">Décimales max : <input type="number" id="divDecMax" value="4" min="1" max="8" style="width:55px;"></label>
        <button type="button" class="btn secondary" onclick="previewDivisionDecimale()">Calculer</button>
      </div>
      <div id="divisionDecPreview"></div>
      <label class="hint" style="display:block;margin:10px 0 0;"><input type="checkbox" id="divDecVierge"> N'afficher que le dividende et le diviseur (à compléter par l'élève -- la hauteur de la barre est calculée pour laisser la place aux étapes)</label>
      <div class="figure-toolbar" style="margin-top:10px;">
        <button type="button" class="btn" onclick="insertDivisionDecimale()">Insérer la division</button>
        <button type="button" class="btn secondary" onclick="closeDivisionDecTool()">Fermer sans insérer</button>
      </div>
    </div>
    </div>
    <div id="axeGroupWrap" style="display:none;">
    <div class="tool-group-tabs" style="display:flex;gap:6px;margin-bottom:10px;">
      <button type="button" class="tool-tab-btn" id="axeTabAxe" onclick="openAxeTool()">Axe gradué</button>
      <button type="button" class="tool-tab-btn" id="axeTabRep" onclick="openRepereTool()">Repère</button>
    </div>
    <div id="axePanel" class="figure-wrap" style="display:none;">
      <p class="hint" style="margin:0 0 10px;">Axe gradué horizontal, avec un ou plusieurs points repérés (facultatif).</p>
      <div class="tool-row" style="margin-bottom:10px;">
        <label class="hint" style="margin:0;">Min : <input type="number" id="axeMin" value="-5" style="width:70px;"></label>
        <label class="hint" style="margin:0;">Max : <input type="number" id="axeMax" value="5" style="width:70px;"></label>
        <label class="hint" style="margin:0;">Pas : <input type="number" id="axeStep" value="1" style="width:70px;"></label>
        <label class="hint" style="margin:0;">Partager chaque unité en : <input type="number" id="axeSubDiv" value="1" min="1" style="width:60px;"></label>
        <input type="text" id="axePoints" placeholder="Points (ex. A(2,5) B(3/4))" style="flex:1;min-width:200px;">
        <label class="hint" style="margin:0;">Compétence :
          <select id="axeMode">
            <option value="lecture">Lire les abscisses (points déjà placés)</option>
            <option value="placer">Placer les points (à tracer par l'élève)</option>
          </select>
        </label>
        <button type="button" class="btn secondary" onclick="previewAxe()">Aperçu</button>
      </div>
      <p class="hint" style="margin:-6px 0 10px;">Utile pour un axe vierge (sans point) où les élèves doivent placer eux-mêmes des fractions : par exemple, partager en 4 fait apparaître un trait à chaque quart d'unité.</p>
      <div id="axePreview"></div>
      <div class="figure-toolbar" style="margin-top:10px;">
        <button type="button" class="btn" onclick="insertAxe()">Insérer l'axe</button>
        <button type="button" class="btn secondary" onclick="closeAxeTool()">Fermer sans insérer</button>
      </div>
    </div>
    <div id="reperePanel" class="figure-wrap" style="display:none;">
      <p class="hint" style="margin:0 0 10px;">Repère orthonormé (ou non), avec des points à placer (facultatif).</p>
      <div class="tool-row" style="margin-bottom:10px;">
        <label class="hint" style="margin:0;">X min/max : <input type="number" id="repXMin" value="-5" style="width:60px;"> / <input type="number" id="repXMax" value="5" style="width:60px;"></label>
        <label class="hint" style="margin:0;">Y min/max : <input type="number" id="repYMin" value="-5" style="width:60px;"> / <input type="number" id="repYMax" value="5" style="width:60px;"></label>
        <input type="text" id="repPoints" placeholder="Points (ex. A(3,5;-2) B(-1;4))" style="flex:1;min-width:200px;">
        <label class="hint" style="margin:0;">Compétence :
          <select id="repMode">
            <option value="lecture">Lire les coordonnées (points déjà placés)</option>
            <option value="placer">Placer les points (à tracer par l'élève)</option>
          </select>
        </label>
        <button type="button" class="btn secondary" onclick="previewRepere()">Aperçu</button>
      </div>
      <div id="reperePreview"></div>
      <div class="figure-toolbar" style="margin-top:10px;">
        <button type="button" class="btn" onclick="insertRepere()">Insérer le repère</button>
        <button type="button" class="btn secondary" onclick="closeRepereTool()">Fermer sans insérer</button>
      </div>
    </div>
    </div>
    <div id="shapeGroupWrap" style="display:none;">
    <div class="tool-group-tabs" style="display:flex;gap:6px;margin-bottom:10px;">
      <button type="button" class="tool-tab-btn" id="shapeTabDisque" onclick="openDisqueTool()">Disque fractionné</button>
      <button type="button" class="tool-tab-btn" id="shapeTabRect" onclick="openRectFracTool()">Rectangle fractionné</button>
    </div>
    <div id="disquePanel" class="figure-wrap" style="display:none;">
      <p class="hint" style="margin:0 0 10px;">Disque partagé en parts égales, avec un nombre de parts colorées (la fraction représentée).</p>
      <div class="tool-row" style="margin-bottom:10px;">
        <label class="hint" style="margin:0;">Parts colorées : <input type="number" id="disqueNum" value="3" min="0" style="width:60px;"></label>
        <label class="hint" style="margin:0;">Parts totales : <input type="number" id="disqueDen" value="4" min="1" style="width:60px;"></label>
        <label class="hint" style="margin:0;"><input type="checkbox" id="disqueVierge"> Laisser vierge (à colorier par l'élève)</label>
      </div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:10px;">
        <div style="border:1px solid rgba(31,122,77,.3);border-radius:8px;padding:8px 12px;background:rgba(31,122,77,.06);">
          <div style="font-size:.72rem;font-weight:700;color:#1F7A4D;margin-bottom:4px;"><span class="gicon">check_circle</span> Réponse affichée (correction)</div>
          <label class="hint" style="display:block;margin:0 0 2px;"><input type="checkbox" id="disqueShowCaption" checked> Écrire la fraction en dessous</label>
          <label class="hint" style="display:block;margin:0;"><input type="checkbox" id="disqueShowMixte"> Avec partie entière (ex. 7/3 = 2 + 1/3)</label>
        </div>
        <div style="border:1px solid rgba(13,91,163,.3);border-radius:8px;padding:8px 12px;background:rgba(13,91,163,.06);">
          <div style="font-size:.72rem;font-weight:700;color:#0D5BA3;margin-bottom:4px;"><span class="gicon">edit_note</span> Exercice à trous (pour l'élève)</div>
          <label class="hint" style="display:block;margin:0 0 2px;"><input type="checkbox" id="disqueReponseSimple"> Réponse à compléter (.../....)</label>
          <label class="hint" style="display:block;margin:0;"><input type="checkbox" id="disqueReponseMixte"> Réponse avec partie entière (... + .../....)</label>
        </div>
      </div>
      <div class="tool-row" style="margin-bottom:10px;">
        <button type="button" class="btn secondary" onclick="previewDisque()">Aperçu</button>
      </div>
      <div id="disquePreview"></div>
      <div class="figure-toolbar" style="margin-top:10px;">
        <button type="button" class="btn" onclick="insertDisque()">Insérer le disque</button>
        <button type="button" class="btn secondary" onclick="closeDisqueTool()">Fermer sans insérer</button>
      </div>
    </div>
    <div id="rectFracPanel" class="figure-wrap" style="display:none;">
      <p class="hint" style="margin:0 0 10px;">Rectangle partagé en bandes égales, avec un nombre de bandes colorées (la fraction représentée). Astuce : clique directement sur les cases de l'aperçu pour choisir précisément lesquelles colorier.</p>
      <div class="tool-row" style="margin-bottom:10px;">
        <label class="hint" style="margin:0;">Parts colorées : <input type="number" id="rectFracNum" value="3" min="0" oninput="syncRectFracCustomSetFromNum(); previewRectFrac();" style="width:60px;"></label>
        <label class="hint" style="margin:0;" id="rectFracDenRow">Parts totales : <input type="number" id="rectFracDen" value="4" min="1" oninput="syncRectFracCustomSetFromNum(); previewRectFrac();" style="width:60px;"></label>
        <label class="hint" style="margin:0;"><input type="checkbox" id="rectFracVert" onchange="previewRectFrac()"> Bandes verticales (au lieu d'horizontales)</label>
      </div>
      <div class="tool-row" style="margin-bottom:10px;">
        <label class="hint" style="margin:0;"><input type="checkbox" id="rectFracGrid" onchange="toggleRectFracGrid(); previewRectFrac();"> Partage en grille (lignes × colonnes à la fois -- utile pour un dénominateur composé, ex. 1/6 vu comme 2×3)</label>
        <span id="rectFracGridRow" style="display:none;">
          <label class="hint" style="margin:0;">Lignes : <input type="number" id="rectFracRows" value="2" min="2" max="8" oninput="syncRectFracCustomSetFromNum(); previewRectFrac();" style="width:50px;"></label>
          <label class="hint" style="margin:0;">Colonnes : <input type="number" id="rectFracCols" value="3" min="2" max="8" oninput="syncRectFracCustomSetFromNum(); previewRectFrac();" style="width:50px;"></label>
        </span>
      </div>
      <div class="tool-row" style="margin-bottom:10px;">
        <label class="hint" style="margin:0;"><input type="checkbox" id="rectFracVierge" onchange="previewRectFrac()"> Laisser vierge (à colorier par l'élève)</label>
      </div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:10px;">
        <div style="border:1px solid rgba(31,122,77,.3);border-radius:8px;padding:8px 12px;background:rgba(31,122,77,.06);">
          <div style="font-size:.72rem;font-weight:700;color:#1F7A4D;margin-bottom:4px;"><span class="gicon">check_circle</span> Réponse affichée (correction)</div>
          <label class="hint" style="display:block;margin:0 0 2px;"><input type="checkbox" id="rectFracShowCaption" checked> Écrire la fraction en dessous</label>
          <label class="hint" style="display:block;margin:0;"><input type="checkbox" id="rectFracShowMixte"> Avec partie entière (ex. 7/3 = 2 + 1/3)</label>
        </div>
        <div style="border:1px solid rgba(13,91,163,.3);border-radius:8px;padding:8px 12px;background:rgba(13,91,163,.06);">
          <div style="font-size:.72rem;font-weight:700;color:#0D5BA3;margin-bottom:4px;"><span class="gicon">edit_note</span> Exercice à trous (pour l'élève)</div>
          <label class="hint" style="display:block;margin:0 0 2px;"><input type="checkbox" id="rectFracReponseSimple"> Réponse à compléter (.../....)</label>
          <label class="hint" style="display:block;margin:0;"><input type="checkbox" id="rectFracReponseMixte"> Réponse avec partie entière (... + .../....)</label>
        </div>
      </div>
      <div class="tool-row" style="margin-bottom:10px;">
        <button type="button" class="btn secondary" onclick="previewRectFrac()">Aperçu</button>
      </div>
      <div id="rectFracPreview"></div>
      <div class="figure-toolbar" style="margin-top:10px;">
        <button type="button" class="btn" onclick="insertRectFrac()">Insérer le rectangle</button>
        <button type="button" class="btn secondary" onclick="closeRectFracTool()">Fermer sans insérer</button>
      </div>
    </div>
    </div>
    <div id="cubesPanel" class="figure-wrap" style="display:none;">
      <p class="hint" style="margin:0 0 10px;">Clique sur un cube pour le sélectionner, puis utilise les flèches pour le déplacer. Perspective cavalière.</p>
      <div id="cubesPreview" style="text-align:center;"></div>
      <div class="tool-row" style="margin:10px 0;justify-content:center;">
        <span class="hint" style="margin:0;">Déplacer le cube sélectionné :</span>
        <button type="button" class="btn secondary" onclick="moveCube(-1,0,0)">◀ Gauche</button>
        <button type="button" class="btn secondary" onclick="moveCube(1,0,0)">Droite ▶</button>
        <button type="button" class="btn secondary" onclick="moveCube(0,1,0)">▲ Haut</button>
        <button type="button" class="btn secondary" onclick="moveCube(0,-1,0)">▼ Bas</button>
        <button type="button" class="btn secondary" onclick="moveCube(0,0,1)">⇖ Arrière</button>
        <button type="button" class="btn secondary" onclick="moveCube(0,0,-1)">⇘ Avant</button>
      </div>
      <div class="tool-row" style="margin-bottom:10px;justify-content:center;">
        <button type="button" class="btn secondary" onclick="addCube()">+ Ajouter un cube</button>
        <button type="button" class="btn secondary" onclick="removeCube()"><span class=gicon>close</span> Retirer le cube sélectionné</button>
      </div>
      <div class="figure-toolbar" style="margin-top:10px;">
        <button type="button" class="btn" onclick="insertCubeStack()">Insérer la figure</button>
        <button type="button" class="btn secondary" onclick="closeCubesTool()">Fermer sans insérer</button>
      </div>
    </div>
    <div id="graphPanel" class="figure-wrap" style="display:none;">
      <p class="hint" style="margin:0 0 10px;">Trace une ou plusieurs courbes (droite définie par deux points, ou fonction) sur le même repère.</p>
      <div class="tool-row" style="margin-bottom:10px;">
        <label class="hint" style="margin:0;" id="graphXMinMaxLabel">X min/max : <input type="number" id="graphXMin" value="-5" step="any" oninput="previewGraph()" style="width:60px;"> / <input type="number" id="graphXMax" value="5" step="any" oninput="previewGraph()" style="width:60px;"></label>
        <label class="hint" style="margin:0;">Y min/max : <input type="number" id="graphYMin" value="-5" oninput="previewGraph()" style="width:60px;"> / <input type="number" id="graphYMax" value="5" oninput="previewGraph()" style="width:60px;"></label>
        <button type="button" class="btn secondary" onclick="autoFitGraph()" title="Ajuste automatiquement les bornes pour bien cadrer les courbes tracées"><span class=gicon>search</span> Cadrage auto</button>
        <label class="hint" style="margin:0;" title="Utile quand les nombres se chevauchent sur un axe étendu">Nombre affiché tous les : X <input type="number" id="graphLabelStepX" value="1" min="1" step="1" oninput="previewGraph()" style="width:40px;"> · Y <input type="number" id="graphLabelStepY" value="1" min="1" step="1" oninput="previewGraph()" style="width:40px;"></label>
      </div>
      <div class="tool-row" style="margin-bottom:10px;">
        <label class="hint" style="margin:0;"><input type="checkbox" id="graphXPi" onchange="previewGraph()"> Axe des x en radians (multiples de π -- utile pour sin, cos, tan). Dans ce mode, X min/max ci-dessus s'exprime en nombre de π (ex. -2 → -2π).</label>
      </div>
      <div id="graphCurvesList"></div>
      <div class="tool-row" style="margin-bottom:10px;">
        <button type="button" class="btn secondary" onclick="addGraphCurve('droite')">+ Droite (2 points)</button>
        <button type="button" class="btn secondary" onclick="addGraphCurve('fonction')">+ Fonction</button>
      </div>
      <div id="graphPreview"></div>
      <p class="hint" style="margin:6px 0 0;">Écriture d'une fonction : mêmes conventions que le reste du site -- <code>x^2-3</code>, <code>2x+1</code>, <code>sqrt(x)</code>, <code>1/x</code>.</p>
      <div class="figure-toolbar" style="margin-top:10px;">
        <button type="button" class="btn" onclick="insertGraph()">Insérer le graphique</button>
        <button type="button" class="btn secondary" onclick="closeGraphTool()">Fermer sans insérer</button>
      </div>
    </div>
    <div id="statsPanel" class="figure-wrap" style="display:none;">
      <p class="hint" style="margin:0 0 10px;">Diagramme statistique à partir d'une liste de catégories (ou de classes pour l'histogramme) et de leurs effectifs.</p>
      <div class="tool-row" style="margin-bottom:10px;">
        <label class="hint" style="margin:0;">Type :
          <select id="statsType" onchange="renderStatsRows()">
            <option value="camembert">Camembert</option>
            <option value="barres">Diagramme en barres</option>
            <option value="batons">Diagramme en bâtons</option>
            <option value="histogramme">Histogramme</option>
          </select>
        </label>
      </div>
      <div id="statsHistoOptions" style="display:none;margin-bottom:10px;">
        <label class="hint" style="margin:0;"><input type="checkbox" id="statsHistoDensity" onchange="previewStats()"> Convention « aire = effectif » (densité) -- à cocher dès que les classes n'ont pas toutes la même largeur ; sinon, hauteur = effectif directement.</label>
      </div>
      <div id="statsRowsList"></div>
      <div class="tool-row" style="margin-bottom:10px;">
        <button type="button" class="btn secondary" onclick="addStatsRow()">+ Ajouter une ligne</button>
      </div>
      <div id="statsPreview"></div>
      <div class="figure-toolbar" style="margin-top:10px;">
        <button type="button" class="btn" onclick="insertStats()">Insérer le diagramme</button>
        <button type="button" class="btn secondary" onclick="closeStatsTool()">Fermer sans insérer</button>
      </div>
    </div>
    <div id="probaGroupWrap" style="display:none;">
    <div class="tool-group-tabs" style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;">
      <button type="button" class="tool-tab-btn" id="probaTabUrn" onclick="openUrnTool()">Sac / urne</button>
      <button type="button" class="tool-tab-btn" id="probaTabCards" onclick="openCardsTool()">Cartes</button>
      <button type="button" class="tool-tab-btn" id="probaTabDice" onclick="openDiceTool()">Dés</button>
      <button type="button" class="tool-tab-btn" id="probaTabTree" onclick="openTreeTool()">Arbre</button>
    </div>
    <div id="urnPanel" class="figure-wrap" style="display:none;">
      <p class="hint" style="margin:0 0 10px;">Sac ou urne contenant des boules de différentes couleurs.</p>
      <div class="tool-row" style="margin-bottom:10px;">
        <label class="hint" style="margin:0;">Forme :
          <select id="urnShape" onchange="previewUrn()">
            <option value="sac">Sac</option>
            <option value="urne">Urne</option>
          </select>
        </label>
      </div>
      <div id="urnRowsList"></div>
      <div class="tool-row" style="margin-bottom:10px;">
        <button type="button" class="btn secondary" onclick="addUrnRow()">+ Ajouter une couleur</button>
      </div>
      <div id="urnPreview"></div>
      <div class="figure-toolbar" style="margin-top:10px;">
        <button type="button" class="btn" onclick="insertUrn()">Insérer</button>
        <button type="button" class="btn secondary" onclick="closeUrnTool()">Fermer sans insérer</button>
      </div>
    </div>
    <div id="cardsPanel" class="figure-wrap" style="display:none;">
      <p class="hint" style="margin:0 0 10px;">Sélectionne les cartes à afficher (jeu de 32 ou 52 cartes).</p>
      <div class="tool-row" style="margin-bottom:10px;">
        <label class="hint" style="margin:0;">Jeu :
          <select id="cardsDeckType" onchange="renderCardsGrid()">
            <option value="52">52 cartes</option>
            <option value="32">32 cartes</option>
          </select>
        </label>
        <button type="button" class="btn secondary" onclick="setCardsPreset('all')">Tout le jeu</button>
        <button type="button" class="btn secondary" onclick="setCardsPreset('none')">Aucune</button>
        <button type="button" class="btn secondary" onclick="setCardsPreset('aces')">Les as</button>
        <button type="button" class="btn secondary" onclick="setCardsPreset('figures')">Les figures</button>
      </div>
      <div id="cardsGrid" style="overflow-x:auto;"></div>
      <div id="cardsPreview" style="margin-top:10px;"></div>
      <div class="figure-toolbar" style="margin-top:10px;">
        <button type="button" class="btn" onclick="insertCards()">Insérer</button>
        <button type="button" class="btn secondary" onclick="closeCardsTool()">Fermer sans insérer</button>
      </div>
    </div>
    <div id="dicePanel" class="figure-wrap" style="display:none;">
      <p class="hint" style="margin:0 0 10px;">Un ou plusieurs dés, avec le nombre de faces et la valeur affichée de ton choix.</p>
      <div id="diceRowsList"></div>
      <div class="tool-row" style="margin-bottom:10px;">
        <button type="button" class="btn secondary" onclick="addDiceRow()">+ Ajouter un dé</button>
      </div>
      <div id="dicePreview"></div>
      <div class="figure-toolbar" style="margin-top:10px;">
        <button type="button" class="btn" onclick="insertDice()">Insérer</button>
        <button type="button" class="btn secondary" onclick="closeDiceTool()">Fermer sans insérer</button>
      </div>
    </div>
    <div id="treePanel" class="figure-wrap" style="display:none;">
      <p class="hint" style="margin:0 0 10px;">Arbre de probabilité : clique sur « + » à côté d'un nœud pour lui ajouter une branche (événement + probabilité), branche par branche.</p>
      <div id="treeCanvas" style="border:1px solid rgba(28,43,57,.15);border-radius:8px;padding:10px;overflow-x:auto;"></div>
      <div id="treePreview" style="margin-top:10px;"></div>
      <div class="figure-toolbar" style="margin-top:10px;">
        <button type="button" class="btn" onclick="insertTree()">Insérer l'arbre</button>
        <button type="button" class="btn secondary" onclick="closeTreeTool()">Fermer sans insérer</button>
      </div>
    </div>
    </div>
    <div id="figurePanel" class="figure-wrap" style="display:none;">
      <div class="tool-row" style="margin-bottom:8px;">
        <textarea id="enonceInput" rows="2" style="flex:1;min-width:260px;font-family:'JetBrains Mono',monospace;font-size:.85rem;padding:10px;border-radius:8px;border:1px solid rgba(28,43,57,.2);"
          placeholder="Ex. : ABC triangle&#10;I milieu de [BC]&#10;cercle de centre A passant par B"></textarea>
        <button type="button" class="btn secondary" onclick="buildFromEnonce()" style="align-self:flex-start;"><span class=gicon>straighten</span> Construire à partir de l'énoncé</button>
        <button type="button" class="btn orange" onclick="interpretEnonceWithAI()" style="align-self:flex-start;"><span class=gicon>smart_toy</span> Interpréter avec l'IA</button>
      </div>
      <p class="hint" style="margin:-4px 0 10px;">Phrases reconnues directement : <span class="hint-mono">ABC triangle</span> (rectangle/isocèle/équilatéral, ex. <span class="hint-mono">ABC triangle rectangle en A</span>) · <span class="hint-mono">ABCD carré/rectangle/losange/parallélogramme</span> · <span class="hint-mono">I milieu de [BC]</span> · <span class="hint-mono">cercle de centre A passant par B</span>. Pour tout le reste (ou un énoncé complet en français libre), utilisez « Interpréter avec l'IA » (nécessite une clé API, à renseigner dans l'onglet Quiz IA).</p>
      <!-- Barre d'outils HORIZONTALE au-dessus du canevas (pas latérale) : la figure et les
           outils restent visibles en même temps, sans faire défiler. Déplacer en premier. Les
           outils proches (segment/droite/demi-droite ; cercle libre/cm ; droites remarquables
           & angles ; triangle/polygone/polygone régulier) restent regroupés sous une seule
           icône avec sous-menu (▾), plutôt que 16+ boutons à plat. -->
      <div style="display:flex;flex-wrap:wrap;gap:4px;align-items:flex-start;margin-bottom:8px;">
        <button type="button" class="fig-icon-btn fig-mode" data-mode="deplacer" onclick="setFigureMode('deplacer')" title="Déplacer un point">✥</button>
        <button type="button" class="fig-icon-btn fig-mode" data-mode="point" onclick="setFigureMode('point')" title="Point">●</button>

        <div class="fig-group-wrap">
        <button type="button" class="fig-icon-btn fig-mode" id="figPrimaryLignes" data-mode="segment" onclick="setFigureMode(this.dataset.mode)" title="Segment (dernier outil choisi dans ce groupe)">
          <svg viewBox="0 0 24 24" width="20" height="20"><line x1="4" y1="16" x2="20" y2="8" stroke="currentColor" stroke-width="1.2"/><circle cx="4" cy="16" r="2" fill="currentColor"/><circle cx="20" cy="8" r="2" fill="currentColor"/></svg>
        </button>
        <button type="button" class="fig-group-corner" onclick="event.stopPropagation(); toggleFigGroup('lignes')" title="Segment / Droite / Demi-droite / Vecteur">▾</button>
        <div id="figGroupLignes" class="fig-group-sub">
          <button type="button" class="fig-icon-btn fig-mode" data-mode="segment" onclick="selectFigSubTool('lignes', this)" title="Segment (2 extrémités marquées)">
            <svg viewBox="0 0 24 24" width="20" height="20"><line x1="4" y1="16" x2="20" y2="8" stroke="currentColor" stroke-width="1.2"/><circle cx="4" cy="16" r="2" fill="currentColor"/><circle cx="20" cy="8" r="2" fill="currentColor"/></svg>
          </button>
          <button type="button" class="fig-icon-btn fig-mode" data-mode="segment-longueur" onclick="selectFigSubTool('lignes', this)" title="Segment de longueur donnée (une fenêtre demande la longueur)" style="font-size:.62rem;"><span class=gicon style="font-size:.9rem;">horizontal_rule</span>cm</button>
          <button type="button" class="fig-icon-btn fig-mode" data-mode="droite" onclick="selectFigSubTool('lignes', this)" title="Droite (2 points de référence, se prolonge des deux côtés)">
            <svg viewBox="0 0 24 24" width="20" height="20"><line x1="1" y1="19" x2="23" y2="5" stroke="currentColor" stroke-width="1.2"/><circle cx="7" cy="15" r="1.8" fill="currentColor"/><circle cx="17" cy="9" r="1.8" fill="currentColor"/></svg>
          </button>
          <button type="button" class="fig-icon-btn fig-mode" data-mode="demi-droite" onclick="selectFigSubTool('lignes', this)" title="Demi-droite (origine + 1 point, se prolonge d'un seul côté)">
            <svg viewBox="0 0 24 24" width="20" height="20"><line x1="5" y1="19" x2="23" y2="5" stroke="currentColor" stroke-width="1.2"/><circle cx="5" cy="19" r="2" fill="currentColor"/><circle cx="14" cy="12" r="1.8" fill="currentColor"/></svg>
          </button>
          <button type="button" class="fig-icon-btn fig-mode" data-mode="vecteur" onclick="selectFigSubTool('lignes', this)" title="Vecteur (origine + extrémité, avec une flèche)">
            <svg viewBox="0 0 24 24" width="20" height="20"><line x1="4" y1="19" x2="19" y2="6" stroke="currentColor" stroke-width="1.2"/><path d="M12.5 6.5 L19 6 L18 12.5" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/><circle cx="4" cy="19" r="1.8" fill="currentColor"/></svg>
          </button>
          <button type="button" class="fig-icon-btn fig-mode" data-mode="mesure-distance" onclick="selectFigSubTool('lignes', this)" title="Mesure de distance (2 points, ou un segment existant)">
            <svg viewBox="0 0 24 24" width="20" height="20"><line x1="3" y1="17" x2="21" y2="17" stroke="currentColor" stroke-width="1.1"/><circle cx="3" cy="17" r="1.8" fill="currentColor"/><circle cx="21" cy="17" r="1.8" fill="currentColor"/><text x="12" y="10" font-size="7" font-family="JetBrains Mono" fill="currentColor" text-anchor="middle">cm</text></svg>
          </button>
        </div>
        </div>

        <div class="fig-group-wrap">
        <button type="button" class="fig-icon-btn fig-mode" id="figPrimaryCercles" data-mode="cercle" onclick="setFigureMode(this.dataset.mode)" title="Cercle (dernier outil choisi dans ce groupe)">
          <svg viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="12" y1="12" x2="12" y2="2" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="2" r="1.6" fill="currentColor"/></svg>
        </button>
        <button type="button" class="fig-group-corner" onclick="event.stopPropagation(); toggleFigGroup('cercles')" title="Cercle (centre+point) / Cercle (rayon donné)">▾</button>
        <div id="figGroupCercles" class="fig-group-sub">
          <button type="button" class="fig-icon-btn fig-mode" data-mode="cercle" onclick="selectFigSubTool('cercles', this)" title="Cercle (centre + un point sur le cercle)">
            <svg viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="12" y1="12" x2="12" y2="2" stroke="currentColor" stroke-width="1"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="2" r="1.6" fill="currentColor"/></svg>
          </button>
          <button type="button" class="fig-icon-btn fig-mode" data-mode="cercle-rayon" onclick="selectFigSubTool('cercles', this)" title="Cercle de rayon donné (une fenêtre demande le rayon)">
            <svg viewBox="0 0 24 24" width="26" height="26"><circle cx="10" cy="14" r="8" fill="none" stroke="currentColor" stroke-width="1.2"/><text x="18" y="6" font-size="7" font-family="JetBrains Mono" fill="currentColor" text-anchor="middle">cm</text><line x1="10" y1="14" x2="18" y2="14" stroke="currentColor" stroke-width="1.2"/><circle cx="10" cy="14" r="1.6" fill="currentColor"/></svg>
          </button>
        </div>
        </div>

        <button type="button" class="fig-icon-btn fig-mode" data-mode="arc" onclick="setFigureMode('arc')" title="Arc de cercle">◡</button>
        <button type="button" class="fig-icon-btn fig-mode" data-mode="milieu" onclick="setFigureMode('milieu')" title="Milieu (cliquez le segment, ou ses 2 extrémités)">
          <svg viewBox="0 0 24 24" width="20" height="20"><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="1.3"/><circle cx="3" cy="12" r="1.8" fill="currentColor"/><circle cx="21" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="2.6" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>
        </button>

        <div class="fig-group-wrap">
        <button type="button" class="fig-icon-btn fig-mode" id="figPrimaryAngles" data-mode="angle" onclick="setFigureMode(this.dataset.mode)" title="Angle (dernier outil choisi dans ce groupe)">∠</button>
        <button type="button" class="fig-group-corner" onclick="event.stopPropagation(); toggleFigGroup('angles')" title="Angle / Angle de mesure donnée">▾</button>
        <div id="figGroupAngles" class="fig-group-sub">
          <button type="button" class="fig-icon-btn fig-mode" data-mode="angle" onclick="selectFigSubTool('angles', this)" title="Angle (marque la mesure d'un angle existant)">∠</button>
          <button type="button" class="fig-icon-btn fig-mode" data-mode="angle-mesure" onclick="selectFigSubTool('angles', this)" title="Construire un angle de mesure donnée">
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M4 20 L20 20 M4 20 L18 6" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M13 20 A5 5 0 0 0 10.7 15.3" stroke="currentColor" stroke-width="1.4" fill="none"/></svg>
          </button>
        </div>
        </div>

        <div class="fig-group-wrap">
        <button type="button" class="fig-icon-btn fig-mode" id="figPrimaryRemarquables" data-mode="perpendiculaire" onclick="setFigureMode(this.dataset.mode)" title="Perpendiculaire (dernier outil choisi dans ce groupe)">
          <svg viewBox="0 0 24 24" width="20" height="20"><line x1="2" y1="17" x2="22" y2="17" stroke="currentColor" stroke-width="1.4"/><line x1="16" y1="6" x2="16" y2="22" stroke="currentColor" stroke-width="1.4"/><rect x="13" y="14" width="3" height="3" fill="none" stroke="currentColor" stroke-width="1"/></svg>
        </button>
        <button type="button" class="fig-group-corner" onclick="event.stopPropagation(); toggleFigGroup('remarquables')" title="Perpendiculaire / Parallèle / Médiatrice / Bissectrice">▾</button>
        <div id="figGroupRemarquables" class="fig-group-sub">
          <button type="button" class="fig-icon-btn fig-mode" data-mode="perpendiculaire" onclick="selectFigSubTool('remarquables', this)" title="Perpendiculaire">
            <svg viewBox="0 0 24 24" width="20" height="20"><line x1="2" y1="17" x2="22" y2="17" stroke="currentColor" stroke-width="1.4"/><line x1="16" y1="6" x2="16" y2="22" stroke="currentColor" stroke-width="1.4"/><rect x="13" y="14" width="3" height="3" fill="none" stroke="currentColor" stroke-width="1"/></svg>
          </button>
          <button type="button" class="fig-icon-btn fig-mode" data-mode="parallele" onclick="selectFigSubTool('remarquables', this)" title="Parallèle">∥</button>
          <button type="button" class="fig-icon-btn fig-mode" data-mode="mediatrice" onclick="selectFigSubTool('remarquables', this)" title="Médiatrice">
            <svg viewBox="0 0 24 24" width="20" height="20"><line x1="2" y1="17" x2="22" y2="17" stroke="currentColor" stroke-width="1.4"/><line x1="12" y1="6" x2="12" y2="22" stroke="currentColor" stroke-width="1.4"/><line x1="6" y1="20" x2="8" y2="14" stroke="currentColor" stroke-width="1.1"/><line x1="16" y1="14" x2="18" y2="20" stroke="currentColor" stroke-width="1.1"/></svg>
          </button>
          <button type="button" class="fig-icon-btn fig-mode" data-mode="bissectrice" onclick="selectFigSubTool('remarquables', this)" title="Bissectrice">⟨</button>
        </div>
        </div>

        <div class="fig-group-wrap">
        <button type="button" class="fig-icon-btn fig-mode" id="figPrimaryPolygones" data-mode="triangle" onclick="setFigureMode(this.dataset.mode)" title="Triangle (dernier outil choisi dans ce groupe)">
          <svg viewBox="0 0 24 24" width="18" height="18"><polygon points="12,3 21,20 3,20" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>
        </button>
        <button type="button" class="fig-group-corner" onclick="event.stopPropagation(); toggleFigGroup('polygones')" title="Triangle / Polygone / Polygone régulier">▾</button>
        <div id="figGroupPolygones" class="fig-group-sub">
          <button type="button" class="fig-icon-btn fig-mode" data-mode="triangle" onclick="selectFigSubTool('polygones', this)" title="Triangle (3 points existants)">
            <svg viewBox="0 0 24 24" width="18" height="18"><polygon points="12,3 21,20 3,20" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>
          </button>
          <button type="button" class="fig-icon-btn fig-mode" data-mode="polygone" onclick="selectFigSubTool('polygones', this)" title="Polygone (nombre de sommets libre, refermer sur le 1er point)">
            <svg viewBox="0 0 24 24" width="18" height="18"><polygon points="12,3 20,9 17,20 7,20 4,9" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>
          </button>
          <span style="display:flex;align-items:center;gap:2px;">
            <button type="button" class="fig-icon-btn fig-mode" data-mode="polygone-regulier" onclick="selectFigSubTool('polygones', this)" title="Polygone régulier (centre puis 1 sommet)">
              <svg viewBox="0 0 24 24" width="18" height="18"><polygon points="12,2 20.6,7.5 20.6,16.5 12,22 3.4,16.5 3.4,7.5" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>
            </button>
            <input type="number" id="polygonSidesInput" value="5" min="3" step="1" title="Nombre de côtés" style="width:38px;padding:4px;border-radius:6px;border:1px solid rgba(28,43,57,.2);font-size:.75rem;">
          </span>
        </div>
        </div>

        <div class="fig-group-wrap">
        <button type="button" class="fig-icon-btn fig-mode" id="figPrimaryTransformations" data-mode="symetrie-axiale" onclick="setFigureMode(this.dataset.mode)" title="Symétrie axiale (dernier outil choisi dans ce groupe)">
          <svg viewBox="0 0 24 24" width="20" height="20"><line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3,2"/><circle cx="6" cy="8" r="1.8" fill="currentColor"/><circle cx="18" cy="8" r="1.8" fill="currentColor"/></svg>
        </button>
        <button type="button" class="fig-group-corner" onclick="event.stopPropagation(); toggleFigGroup('transformations')" title="Symétrie axiale / Symétrie centrale / Translation">▾</button>
        <div id="figGroupTransformations" class="fig-group-sub">
          <button type="button" class="fig-icon-btn fig-mode" data-mode="symetrie-axiale" onclick="selectFigSubTool('transformations', this)" title="Symétrie axiale (2 points sur l'axe, puis le point à transformer)">
            <svg viewBox="0 0 24 24" width="20" height="20"><line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3,2"/><circle cx="6" cy="8" r="1.8" fill="currentColor"/><circle cx="18" cy="8" r="1.8" fill="currentColor"/></svg>
          </button>
          <button type="button" class="fig-icon-btn fig-mode" data-mode="symetrie-centrale" onclick="selectFigSubTool('transformations', this)" title="Symétrie centrale (le centre, puis le point à transformer)">
            <svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="5" cy="19" r="1.8" fill="currentColor"/><circle cx="19" cy="5" r="1.8" fill="currentColor"/><line x1="5" y1="19" x2="19" y2="5" stroke="currentColor" stroke-width="1" stroke-dasharray="2,2"/></svg>
          </button>
          <button type="button" class="fig-icon-btn fig-mode" data-mode="translation" onclick="selectFigSubTool('transformations', this)" title="Translation (2 points définissant le vecteur, puis le point à déplacer)">
            <svg viewBox="0 0 24 24" width="20" height="20"><line x1="3" y1="14" x2="14" y2="3" stroke="currentColor" stroke-width="1.2"/><path d="M8.5 3 L14 3 L14 8.5" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/><circle cx="10" cy="21" r="1.8" fill="currentColor"/></svg>
          </button>
        </div>
        </div>

        <div style="width:1px;align-self:stretch;background:rgba(28,43,57,.15);margin:0 2px;"></div>
        <button type="button" class="fig-icon-btn" onclick="openCodageManager()" title="Coder (longueurs/angles égaux, angle droit) -- ouvre la liste des objets" style="border-color:var(--accent-orange);color:var(--accent-orange);">✓</button>
        <div style="width:1px;align-self:stretch;background:rgba(28,43,57,.15);margin:0 2px;"></div>
        <button type="button" class="fig-icon-btn" onclick="undoFigure()" title="Annuler le dernier">↩︎</button>
        <button type="button" class="fig-icon-btn" onclick="redoFigure()" title="Rétablir">↪︎</button>
        <button type="button" class="fig-icon-btn" onclick="clearFigure()" title="Effacer tout"><span class=gicon>cleaning_services</span></button>
      </div>
      <div style="display:flex;gap:12px;align-items:stretch;">
        <!-- Zone principale : réglages contextuels (compas, codage) au-dessus, puis le
             canevas -- toujours visible sous la barre d'outils, jamais caché derrière elle.
             Le compas est une icône à bascule (pas une case+texte sur toute une ligne), et le
             bloc codage ne s'affiche que lorsque le mode "Coder" est actif, pour ne pas
             prendre de place le reste du temps. -->
        <div style="flex:1;min-width:0;display:flex;flex-direction:column;">
          <div class="tool-row" style="margin:0 0 6px;align-items:center;">
            <button type="button" id="compassToggleBtn" class="fig-icon-btn" style="width:32px;height:32px;font-size:.95rem;" onclick="toggleCompassMode()" title="Simuler un compas (pour Cercle/Arc)">
              <svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 3 L6 20 M12 3 L18 20" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/><circle cx="12" cy="3" r="1.6" fill="currentColor"/></svg>
            </button>
            <input type="checkbox" id="compassToggle" style="display:none;">
            <span class="hint" style="margin:0;">Compas (Cercle/Arc)</span>
          </div>
          <svg id="figureSvg" viewBox="0 0 500 320" onclick="onFigureClick(event)"
               style="width:100%;flex:1;min-height:400px;display:block;background:#fff;border:1px solid rgba(28,43,57,.15);border-radius:8px;cursor:crosshair;"></svg>
          <p class="hint" style="margin-top:8px;" id="figureHint">Cliquez pour placer un point.</p>
        </div>
      </div>
      <div class="figure-toolbar" style="margin-top:10px;">
        <button type="button" class="btn" onclick="validateFigure()">✓ Valider et insérer la figure</button>
        <button type="button" class="btn secondary" onclick="closeFigureTool()">Fermer sans insérer</button>
      </div>
    </div>
  </div>
</div>`);

/* ---- Texte libre (même mise en forme que l'énoncé principal) ---- */
/* Insère un modèle (ex. "somme(n,1,10,n)") à l'endroit du curseur dans la zone de texte, pour
   que le professeur n'ait plus qu'à remplacer les valeurs par défaut. */
function insertMathTemplate(template){
  const ta = document.getElementById('textBlockInput');
  const start = ta.selectionStart, end = ta.selectionEnd;
  ta.value = ta.value.slice(0,start) + template + ta.value.slice(end);
  ta.focus();
  ta.selectionStart = ta.selectionEnd = start + template.length;
  previewTextBlock();
}

/* ---- Éditeur de formule pas à pas -------------------------------------------------------
   Une formule est une structure ARBORESCENTE (pas du texte à analyser après coup). Les
   emplacements "principaux" (racine de la formule, numérateur, dénominateur, expression d'une
   somme/limite/intégrale, contenu d'une racine carrée) sont des SÉQUENCES : plusieurs cases
   mises bout à bout (texte libre et/ou structures imbriquées), pour pouvoir écrire par exemple
   "3x + [fraction]" dans une même case. Les emplacements "secondaires" (bornes d'une somme,
   variable d'une limite, exposant) restent une case unique, cas d'usage bien plus rare pour un
   mélange texte+structure. La conversion en LaTeX final parcourt cet arbre directement -- plus
   besoin de deviner où sont les parenthèses dans du texte brut, la structure EST l'interface. */
function fbNewLeaf(v){ return {type:'leaf', value:v||''}; }
function fbNewSeq(v){ return {type:'seq', items:[fbNewLeaf(v||'')]}; }
function fbNewStruct(kind){
  if(kind==='frac') return {type:'frac', num:fbNewSeq(), den:fbNewSeq()};
  if(kind==='pow') return {type:'pow', base:fbNewLeaf(), exp:fbNewLeaf()};
  if(kind==='sub') return {type:'sub', base:fbNewLeaf(), sub:fbNewLeaf()};
  if(kind==='sqrt') return {type:'sqrt', expr:fbNewSeq()};
  if(kind==='sum') return {type:'sum', from:fbNewLeaf('1'), to:fbNewLeaf('n'), expr:fbNewSeq()};
  if(kind==='int') return {type:'int', from:fbNewLeaf('0'), to:fbNewLeaf('1'), expr:fbNewSeq(), dvar:fbNewLeaf('x')};
  if(kind==='lim') return {type:'lim', dvar:fbNewLeaf('x'), to:fbNewLeaf('0'), expr:fbNewSeq()};
  return fbNewLeaf();
}
let fbRoot = null; // la racine est elle-même une séquence
let fbFocusedPath = null; // chemin (tableau de clés) vers la dernière case texte cliquée
function fbPathToStr(path){ return path.join('|'); }
function fbStrToPath(str){ return str==='' ? [] : str.split('|').map(s=>/^\d+$/.test(s)?parseInt(s):s); }
function openFormulaBuilder(){
  fbRoot = fbNewSeq();
  fbFocusedPath = null;
  document.getElementById('formulaBuilderOverlay').style.display='flex';
  fbRender();
}
function closeFormulaBuilder(){ document.getElementById('formulaBuilderOverlay').style.display='none'; }
function fbGetNode(path){
  let node = fbRoot;
  for(const step of path) node = node[step];
  return node;
}
function fbSetNode(path, value){
  if(path.length===0){ fbRoot = value; return; }
  let node = fbRoot;
  for(let i=0;i<path.length-1;i++) node = node[path[i]];
  node[path[path.length-1]] = value;
}
/* Transforme la case actuellement sélectionnée en la structure choisie (fraction, somme...).
   Sans case sélectionnée au préalable, remplace la première case si elle est encore vide
   (cas le plus fréquent), sinon s'ajoute à la fin de la formule. */
function fbInsertAtFocus(kind){
  if(!fbFocusedPath){
    if(fbRoot.items.length===1 && fbRoot.items[0].type==='leaf' && fbRoot.items[0].value==='') fbRoot.items[0] = fbNewStruct(kind);
    else fbRoot.items.push(fbNewStruct(kind));
  } else {
    fbSetNode(fbFocusedPath, fbNewStruct(kind));
  }
  fbFocusedPath = null;
  fbRender();
}
function fbAddToSeq(seqPathStr){
  fbGetNode(fbStrToPath(seqPathStr)).items.push(fbNewLeaf(''));
  fbRender();
}
function fbRemoveSeqItem(seqPathStr, idx){
  const seq = fbGetNode(fbStrToPath(seqPathStr));
  if(seq.items.length<=1) seq.items[0] = fbNewLeaf('');
  else seq.items.splice(idx,1);
  fbRender();
}
/* Une structure dans un emplacement "case unique" (borne, variable, exposant) se retire en
   redevenant simplement une case de texte libre vide, à son emplacement exact. */
function fbClearNode(pathStr){
  fbSetNode(fbStrToPath(pathStr), fbNewLeaf(''));
  fbRender();
}
function fbUpdateLeaf(pathStr, value){
  fbGetNode(fbStrToPath(pathStr)).value = value; // pas de re-rendu : on garde le focus/curseur
}
function fbRender(){
  document.getElementById('formulaBuilderCanvas').innerHTML = fbRenderSeq(fbRoot, []);
}
function fbLeafInput(node, path){
  const pathStr = fbPathToStr(path);
  const w = Math.max(30, node.value.length*9+18);
  return `<input type="text" value="${escapeHtml(node.value)}" oninput="fbUpdateLeaf(this.dataset.path, this.value); this.style.width=Math.max(30,this.value.length*9+18)+'px';" onfocus="fbFocusedPath = fbStrToPath(this.dataset.path)" data-path="${pathStr}" style="width:${w}px;border:1.5px solid rgba(28,43,57,.3);border-radius:6px;padding:5px 7px;font-family:'JetBrains Mono',monospace;font-size:1rem;text-align:center;vertical-align:middle;">`;
}
/* Une SÉQUENCE (racine, numérateur, dénominateur, expression...) : plusieurs cases bout à bout,
   avec un petit "+" à la fin pour en ajouter une nouvelle (texte, qu'on peut ensuite transformer
   en structure en cliquant dedans puis sur un symbole). */
function fbRenderSeq(seq, path){
  const inner = seq.items.map((item,i)=>fbRenderSeqItem(item,[...path,'items',i],path,i)).join('');
  return `<span style="display:inline-flex;align-items:center;gap:2px;">${inner}<button type="button" onclick="fbAddToSeq('${fbPathToStr(path)}')" title="Ajouter une case ici" style="border:none;background:rgba(28,43,57,.08);border-radius:5px;width:20px;height:20px;font-size:.75rem;cursor:pointer;vertical-align:middle;">+</button></span>`;
}
function fbRenderSeqItem(node, path, seqPath, idx){
  if(node.type==='leaf') return fbLeafInput(node, path);
  const removeBtn = `<button type="button" onclick="fbRemoveSeqItem('${fbPathToStr(seqPath)}',${idx})" title="Retirer cette structure" style="border:none;background:#FDEAEA;color:#D93025;border-radius:5px;width:20px;height:20px;font-size:.7rem;cursor:pointer;vertical-align:middle;margin-left:2px;"><span class=gicon>close</span></button>`;
  return `<span style="display:inline-flex;align-items:center;background:rgba(13,91,163,.05);border:1px solid rgba(13,91,163,.18);border-radius:8px;padding:6px 8px;margin:0 3px;vertical-align:middle;">${fbRenderStruct(node,path)}</span>${removeBtn}`;
}
/* Une case UNIQUE (borne, variable, exposant) : soit une simple entrée de texte, soit une
   structure imbriquée -- rendue dans le même style de cadre que dans une séquence. */
function fbRenderSlot(node, path){
  if(node.type==='leaf') return fbLeafInput(node, path);
  const removeBtn = `<button type="button" onclick="fbClearNode('${fbPathToStr(path)}')" title="Retirer cette structure" style="border:none;background:#FDEAEA;color:#D93025;border-radius:5px;width:20px;height:20px;font-size:.7rem;cursor:pointer;vertical-align:middle;margin-left:2px;"><span class=gicon>close</span></button>`;
  return `<span style="display:inline-flex;align-items:center;background:rgba(13,91,163,.05);border:1px solid rgba(13,91,163,.18);border-radius:8px;padding:6px 8px;margin:0 3px;vertical-align:middle;">${fbRenderStruct(node,path)}</span>${removeBtn}`;
}
function fbRenderStruct(node, path){
  if(node.type==='frac'){
    return `<span style="display:inline-flex;flex-direction:column;align-items:center;">
      <span>${fbRenderSeq(node.num,[...path,'num'])}</span>
      <span style="border-top:2px solid #1C1B2E;width:100%;height:0;margin:3px 0;"></span>
      <span>${fbRenderSeq(node.den,[...path,'den'])}</span>
    </span>`;
  }
  if(node.type==='pow'){
    return `<span style="position:relative;display:inline-block;padding-right:32px;">${fbRenderSlot(node.base,[...path,'base'])}<span style="position:absolute;top:-10px;right:0;font-size:.72rem;">${fbRenderSlot(node.exp,[...path,'exp'])}</span></span>`;
  }
  if(node.type==='sub'){
    return `<span style="position:relative;display:inline-block;padding-right:32px;">${fbRenderSlot(node.base,[...path,'base'])}<span style="position:absolute;bottom:-10px;right:0;font-size:.72rem;">${fbRenderSlot(node.sub,[...path,'sub'])}</span></span>`;
  }
  if(node.type==='sqrt'){
    return `<span style="display:inline-flex;align-items:center;">√<span style="border-top:2px solid #1C1B2E;padding:0 4px;margin-left:2px;">${fbRenderSeq(node.expr,[...path,'expr'])}</span></span>`;
  }
  if(node.type==='sum' || node.type==='int'){
    const symbol = node.type==='sum' ? 'Σ' : '∫';
    const labelHaut = node.type==='sum' ? '(jusqu\'à)' : '(borne haute)';
    const labelBas = node.type==='sum' ? '(à partir de)' : '(borne basse)';
    const bounds = `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px;">
        <span title="${labelHaut}">${fbRenderSlot(node.to,[...path,'to'])}</span>
        <span style="font-size:1.7rem;line-height:1;">${symbol}</span>
        <span title="${labelBas}">${fbRenderSlot(node.from,[...path,'from'])}</span>
      </span>`;
    const tail = node.type==='int' ? `<span style="margin-left:4px;">d${fbRenderSlot(node.dvar,[...path,'dvar'])}</span>` : '';
    return `<span style="display:inline-flex;align-items:center;gap:5px;">${bounds}<span>${fbRenderSeq(node.expr,[...path,'expr'])}</span>${tail}</span>`;
  }
  if(node.type==='lim'){
    return `<span style="display:inline-flex;align-items:center;gap:5px;">
      <span style="display:inline-flex;flex-direction:column;align-items:center;">
        <span>lim</span>
        <span style="display:inline-flex;align-items:center;gap:2px;font-size:.8rem;">${fbRenderSlot(node.dvar,[...path,'dvar'])}→${fbRenderSlot(node.to,[...path,'to'])}</span>
      </span>
      <span>${fbRenderSeq(node.expr,[...path,'expr'])}</span>
    </span>`;
  }
  return '';
}
/* Parcourt l'arbre pour produire le LaTeX final -- aucune analyse de texte, la structure
   garantit un résultat correct quelle que soit la complexité ou l'imbrication. */
function fbToLatex(node){
  if(node.type==='seq') return node.items.map(fbToLatex).join('');
  if(node.type==='leaf') return node.value;
  if(node.type==='frac') return `\\dfrac{${fbToLatex(node.num)}}{${fbToLatex(node.den)}}`;
  if(node.type==='pow') return `{${fbToLatex(node.base)}}^{${fbToLatex(node.exp)}}`;
  if(node.type==='sub') return `{${fbToLatex(node.base)}}_{${fbToLatex(node.sub)}}`;
  if(node.type==='sqrt') return `\\sqrt{${fbToLatex(node.expr)}}`;
  if(node.type==='sum') return `\\displaystyle\\sum_{${fbToLatex(node.from)}}^{${fbToLatex(node.to)}} ${fbToLatex(node.expr)}`;
  if(node.type==='int') return `\\displaystyle\\int_{${fbToLatex(node.from)}}^{${fbToLatex(node.to)}} ${fbToLatex(node.expr)} \\, d${fbToLatex(node.dvar)}`;
  if(node.type==='lim') return `\\displaystyle\\lim_{${fbToLatex(node.dvar)} \\to ${fbToLatex(node.to)}} ${fbToLatex(node.expr)}`;
  return '';
}
function fbInsertFinal(){
  const latex = fbToLatex(fbRoot).trim();
  if(latex) insertMathTemplate('$'+latex+'$');
  closeFormulaBuilder();
}



function previewTextBlock(){
  const val = document.getElementById('textBlockInput').value;
  document.getElementById('textBlockPreview').innerHTML = val.trim() ? renderMathText(val) : '';
}
function openTextBlockTool(){
  hideAllToolContent();
  document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('textBlockPanel').style.display='block';
  document.getElementById('textBlockInput').value = '';
  document.getElementById('textBlockPreview').innerHTML = '';
  document.getElementById('textBlockPanel').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function closeTextBlockTool(){ document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('textBlockPanel').style.display='none'; }
function insertTextBlock(){
  const text = document.getElementById('textBlockInput').value;
  if(!text.trim()) return;
  const html = `<div style="padding:4px 0;">${renderMathText(text)}</div>`;
  addPendingBlock('texte', html, {text}, 'reopenTextBlock');
  closeTextBlockTool();
}
function reopenTextBlock(data){
  openTextBlockTool();
  document.getElementById('textBlockInput').value = data.text;
  previewTextBlock();
}
let imageImportDataUri = null;
function previewImportedImage(file){
  if(!file) return;
  if(!file.type || !file.type.startsWith('image/')){ niceAlert("Ce fichier n'est pas une image."); return; }
  const reader = new FileReader();
  reader.onload = ()=>{
    imageImportDataUri = reader.result;
    document.getElementById('imageImportPreview').innerHTML = `<img src="${imageImportDataUri}" style="max-width:100%;max-height:260px;display:block;margin:0 auto;border-radius:6px;border:1px solid rgba(28,43,57,.15);"/>`;
    document.getElementById('imageImportInsertBtn').disabled = false;
  };
  reader.onerror = ()=>{ niceAlert("Impossible de lire cette image."); };
  reader.readAsDataURL(file);
}
function openImageTool(){
  hideAllToolContent();
  document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('imagePanel').style.display='block';
  imageImportDataUri = null;
  document.getElementById('imageImportPreview').innerHTML = '';
  document.getElementById('imageImportInsertBtn').disabled = true;
  document.getElementById('imageImportInput').value = '';
  document.getElementById('imagePanel').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function closeImageTool(){ document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('imagePanel').style.display='none'; }
function insertImageBlock(){
  if(!imageImportDataUri) return;
  const html = `<div style="text-align:center;padding:6px 0;"><img src="${imageImportDataUri}" style="max-width:100%;max-height:400px;border-radius:6px;border:1px solid rgba(28,43,57,.15);" alt="Image importée"/></div>`;
  addPendingBlock('image', html, {src:imageImportDataUri}, 'reopenImageBlock');
  closeImageTool();
}
function reopenImageBlock(data){
  openImageTool();
  imageImportDataUri = data.src;
  document.getElementById('imageImportPreview').innerHTML = `<img src="${data.src}" style="max-width:100%;max-height:260px;display:block;margin:0 auto;border-radius:6px;border:1px solid rgba(28,43,57,.15);"/>`;
  document.getElementById('imageImportInsertBtn').disabled = false;
}
/* Icônes en trait fin (SVG), sobres et monochromes -- plus adaptées à un contexte professionnel
   que des émojis. Dupliquées telles quelles dans index.html pour la barre fixe de l'outil de
   correction (markup statique, ne peut pas appeler cette fonction JS). */
const TOOL_ICONS = {
  texte: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
  image: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="1.5"/><circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" stroke="none"/><path d="M21 16 L15 10 L6 19"/></svg>`,
  figure: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 4 L21 20 L3 20 Z"/></svg>`,
  tableau: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="1"/><line x1="3.5" y1="9.5" x2="20.5" y2="9.5"/><line x1="3.5" y1="15.5" x2="20.5" y2="15.5"/><line x1="9.5" y1="3.5" x2="9.5" y2="20.5"/><line x1="15.5" y1="3.5" x2="15.5" y2="20.5"/></svg>`,
  division: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="12" x2="20" y2="12"/><circle cx="12" cy="6" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="18" r="1.3" fill="currentColor" stroke="none"/></svg>`,
  axe: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="3"/><polyline points="1.5,7 4,3 6.5,7"/><line x1="3" y1="20" x2="21" y2="20"/><polyline points="17,17.5 21,20 17,22.5"/><circle cx="10" cy="13" r="1.3" fill="currentColor" stroke="none"/><circle cx="15" cy="8" r="1.3" fill="currentColor" stroke="none"/></svg>`,
  fraction: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 3 A9 9 0 0 1 12 21 Z" fill="currentColor" stroke="none"/><line x1="12" y1="3" x2="12" y2="21"/></svg>`,
  cubes: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M12 2 L21 7 L21 17 L12 22 L3 17 L3 7 Z"/><path d="M12 2 L12 12 L21 7 M12 12 L3 7 M12 12 L12 22"/></svg>`,
  graph: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21 L3 3"/><path d="M3 21 L21 21"/><path d="M4 15 Q9 4 13 13 T21 6"/></svg>`,
  stats: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="21" x2="21" y2="21"/><rect x="5" y="13" width="4" height="8" fill="currentColor" stroke="none"/><rect x="11" y="8" width="4" height="13" fill="currentColor" stroke="none"/><rect x="17" y="3" width="4" height="18" fill="currentColor" stroke="none"/></svg>`,
  urn: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4 L4 20 Q4 22 6 22 L18 22 Q20 22 20 20 L18 4"/><circle cx="9" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="14" cy="15" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="9" r="1.6" fill="currentColor" stroke="none"/></svg>`,
};
function toolButtonsHTML(ctx){
  const set = `setToolContext('${ctx}');`;
  return `
    <button type="button" class="tool-icon-btn" title="Texte" onclick="${set}openTextBlockTool()">${TOOL_ICONS.texte}</button>
    <button type="button" class="tool-icon-btn" title="Importer une image" onclick="${set}openImageTool()">${TOOL_ICONS.image}</button>
    <button type="button" class="tool-icon-btn" title="Figure géométrique" onclick="${set}openFigureTool()">${TOOL_ICONS.figure}</button>
    <button type="button" class="tool-icon-btn" title="Tableau" onclick="${set}openTableauTool()">${TOOL_ICONS.tableau}</button>
    <button type="button" class="tool-icon-btn" title="Division (euclidienne / décimale)" onclick="${set}openDivisionTool()">${TOOL_ICONS.division}</button>
    <button type="button" class="tool-icon-btn" title="Axe gradué / Repère" onclick="${set}openAxeTool()">${TOOL_ICONS.axe}</button>
    <button type="button" class="tool-icon-btn" title="Fraction visuelle (disque / rectangle)" onclick="${set}openDisqueTool()">${TOOL_ICONS.fraction}</button>
    <button type="button" class="tool-icon-btn" title="Cubes empilés" onclick="${set}openCubesTool()">${TOOL_ICONS.cubes}</button>
    <button type="button" class="tool-icon-btn" title="Graphique (droites / fonctions)" onclick="${set}openGraphTool()">${TOOL_ICONS.graph}</button>
    <button type="button" class="tool-icon-btn" title="Diagramme statistique" onclick="${set}openStatsTool()">${TOOL_ICONS.stats}</button>
    <button type="button" class="tool-icon-btn" title="Probabilités (sac/urne, cartes, dés, arbre)" onclick="${set}openUrnTool()">${TOOL_ICONS.urn}</button>
  `;
}
let figDragPoint = null;
const SCALE_PX_PER_CM = 20;
/* La barre d'outils de l'outil de correction (#corToolsRow) réutilise exactement les mêmes
   boutons que ceux d'un exercice d'évaluation (toolButtonsHTML), plutôt qu'une liste
   recopiée à la main dans index.html -- une telle duplication avait fini par diverger
   silencieusement (le bouton "Importer une image" manquait uniquement côté correction). */
(function initCorToolsRow(){
  const box = document.getElementById('corToolsRow');
  if(!box) return;
  const statusSpan = document.getElementById('figureStatus');
  box.innerHTML = toolButtonsHTML('global') + (statusSpan ? statusSpan.outerHTML : '<span class="hint" id="figureStatus" style="margin:0;"></span>');
})();

/* Ferme tous les panneaux d'outils et la modale qui les enveloppe (clic en dehors de la modale,
   ou changement de contexte). */
/* Masque tout le contenu des outils (panneaux seuls et groupes à onglets), sans fermer la
   modale elle-même -- appelé au début de chaque fonction d'ouverture d'outil, pour qu'un seul
   outil (ou groupe) soit jamais visible à la fois. */
function hideAllToolContent(){
  ['figurePanel','tableauPanel','textBlockPanel','imagePanel','cubesPanel','graphPanel','statsPanel','probaGroupWrap','urnPanel','cardsPanel','dicePanel','treePanel','divisionPanel','divisionDecPanel','axePanel','reperePanel','disquePanel','rectFracPanel','divisionGroupWrap','axeGroupWrap','shapeGroupWrap'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.style.display='none';
  });
}
/* Bascule entre deux outils regroupés sous les mêmes onglets (division euclidienne/décimale,
   axe/repère, disque/rectangle) : affiche le groupe demandé, met en évidence l'onglet actif. */
function activateToolTab(wrapId, activeTabId, inactiveTabId){
  hideAllToolContent();
  document.getElementById(wrapId).style.display='block';
  const activeTab = document.getElementById(activeTabId), inactiveTab = document.getElementById(inactiveTabId);
  if(activeTab) activeTab.classList.add('active');
  if(inactiveTab) inactiveTab.classList.remove('active');
}
function closeAllToolPanels(){
  ['figurePanel','tableauPanel','textBlockPanel','imagePanel','cubesPanel','graphPanel','statsPanel','probaGroupWrap','urnPanel','cardsPanel','dicePanel','treePanel','divisionPanel','divisionDecPanel','axePanel','reperePanel','disquePanel','rectFracPanel','divisionGroupWrap','axeGroupWrap','shapeGroupWrap'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.style.display='none';
  });
  document.getElementById('toolsModalOverlay').style.display='none';
}
function openFigureTool(){hideAllToolContent(); document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('figurePanel').style.display='block';
  resetFigureState();
  setFigureMode('point');
  document.getElementById('figurePanel').scrollIntoView({behavior:'smooth', block:'nearest'});
}
function closeFigureTool(){document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('figurePanel').style.display='none'; }

/* ---- mini outil : insérer un tableau ---- */
function openTableauTool(){hideAllToolContent(); document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('tableauPanel').style.display='block';
  buildTableauGrid();
  document.getElementById('tableauPanel').scrollIntoView({behavior:'smooth', block:'nearest'});
}
function closeTableauTool(){document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('tableauPanel').style.display='none'; }
function buildTableauGrid(){
  const cols = Math.max(1, Math.min(8, parseInt(document.getElementById('tabCols').value)||3));
  const rows = Math.max(1, Math.min(12, parseInt(document.getElementById('tabRows').value)||3));
  let html = '<table style="border-collapse:collapse;">';
  for(let r=0;r<rows;r++){
    html += '<tr>';
    for(let c=0;c<cols;c++){
      html += `<td style="padding:2px;border:1px solid rgba(28,43,57,.15);">
        <input type="text" data-r="${r}" data-c="${c}" style="width:90px;padding:6px;border:none;text-align:center;${r===0?'font-weight:700;':''}" placeholder="${r===0?'En-tête':''}">
      </td>`;
    }
    html += '</tr>';
  }
  html += '</table>';
  document.getElementById('tableauGrid').innerHTML = html;
}
function insertTableau(){
  const cols = Math.max(1, Math.min(8, parseInt(document.getElementById('tabCols').value)||3));
  const rows = Math.max(1, Math.min(12, parseInt(document.getElementById('tabRows').value)||3));
  const grid = [];
  for(let r=0;r<rows;r++) grid.push(new Array(cols).fill(''));
  document.querySelectorAll('#tableauGrid input').forEach(inp=>{
    grid[parseInt(inp.dataset.r)][parseInt(inp.dataset.c)] = inp.value.trim();
  });
  let html = '<table style="border-collapse:collapse;width:auto;margin:8px 0;font-size:.92rem;">';
  grid.forEach((row,r)=>{
    html += '<tr>';
    row.forEach(cell=>{
      const tag = r===0 ? 'th' : 'td';
      const style = r===0 ? 'background:rgba(31,58,92,.06);font-weight:700;' : '';
      html += `<${tag} style="padding:7px 12px;border:1px solid rgba(28,43,57,.18);${style}">${escapeHtml(cell)}</${tag}>`;
    });
    html += '</tr>';
  });
  html += '</table>';
  addPendingBlock('tableau', html, {cols, rows, grid}, 'reopenTableau');
  closeTableauTool();
}
function reopenTableau(data){
  openTableauTool();
  document.getElementById('tabCols').value = data.cols;
  document.getElementById('tabRows').value = data.rows;
  buildTableauGrid();
  setTimeout(()=>{
    document.querySelectorAll('#tableauGrid input').forEach(inp=>{
      const v = data.grid[parseInt(inp.dataset.r)]?.[parseInt(inp.dataset.c)];
      if(v!==undefined) inp.value = v;
    });
  }, 0);
}

/* ---- mini outil : insérer une division posée (calculée automatiquement) ---- */
function computeDivisionPosee(dividend, divisor){
  if(!Number.isInteger(dividend) || !Number.isInteger(divisor) || divisor<=0 || dividend<0) return null;
  const digits = String(dividend).split('').map(Number);
  const quotientDigits = [];
  let current = 0, started = false;
  const steps = [];
  for(let i=0;i<digits.length;i++){
    const priorRemainder = current;
    current = current*10 + digits[i];
    if(current >= divisor){
      const q = Math.floor(current/divisor), sub = q*divisor;
      steps.push({value:current, priorRemainder, broughtDown:digits[i], qDigit:q, sub:sub});
      current -= sub;
      quotientDigits.push(q);
      started = true;
    } else {
      if(started){ quotientDigits.push(0); steps.push({value:current, priorRemainder, broughtDown:digits[i], qDigit:0, sub:0}); }
      else steps.push({value:current, priorRemainder, broughtDown:digits[i], qDigit:null, sub:null});
    }
  }
  return {quotient: parseInt(quotientDigits.join('')||'0'), remainder: current, steps, dividend, divisor};
}
function dpAlignedCells(str, endCol, N){
  const cells = new Array(N).fill('');
  const chars = String(str).split('');
  for(let k=0;k<chars.length;k++){
    const col = endCol - (chars.length-1-k);
    if(col>=0 && col<N) cells[col] = chars[k];
  }
  return cells;
}
function dpRenderDivisionTable(rows, quotient, divisor, commaCol, vierge){
  const cellStyle = `width:22px;text-align:center;padding:${vierge?'11px':'2px'} 0;`;
  const rowsHtml = rows.map(r=>{
    const signTd = `<td style="width:16px;text-align:center;${r.underline?'border-bottom:1.5px solid #1C1B2E;':''}">${r.sign?'−':''}</td>`;
    const tds = r.cells.map((c,ci)=>{
      let style = cellStyle;
      if(r.bold) style += 'font-weight:700;';
      if(r.underline && (r.endCol===undefined || ci<=r.endCol)) style += 'border-bottom:1.5px solid #1C1B2E;';
      if(commaCol!==undefined && ci===commaCol) style += 'border-right:1px dashed rgba(28,43,57,.45);';
      return `<td style="${style}">${c}</td>`;
    }).join('');
    return `<tr>${signTd}${tds}</tr>`;
  }).join('');
  const rowPad = vierge ? '11px' : '2px';
  return `<div style="display:flex;gap:18px;align-items:stretch;font-family:'JetBrains Mono',monospace;font-size:1.05rem;">
    <table style="border-collapse:collapse;">${rowsHtml}</table>
    <div style="border-left:1.5px solid #1C1B2E;">
      <div style="padding:${rowPad} 0 ${rowPad} 14px;">${divisor}</div>
      <div style="border-top:1.5px solid #1C1B2E;padding:6px 0 0 14px;">${quotient||'&nbsp;'}</div>
    </div>
  </div>`;
}
function divisionPoseeHTML(res, vierge, showDiff){
  if(showDiff===undefined) showDiff = true;
  if(!res) return '<p class="hint" style="color:var(--accent-orange);">Le dividende et le diviseur doivent être des entiers, et le diviseur non nul.</p>';
  const dividendStr = String(res.dividend);
  const N = dividendStr.length;
  const rows = [{cells: dpAlignedCells(dividendStr, N-1, N), bold:true}];
  let lastEndCol = -1;
  if(showDiff){
    res.steps.forEach((s,i)=>{
      if(s.sub>0){
        rows.push({cells: dpAlignedCells(vierge?'':String(s.sub), i, N), sign:!vierge, underline:!vierge, endCol:i});
        rows.push({cells: dpAlignedCells(vierge?'':String(s.value-s.sub), i, N)});
        lastEndCol = i;
      }
    });
    if(lastEndCol < N-1) rows.push({cells: dpAlignedCells(vierge?'':String(res.remainder), N-1, N)});
  } else {
    // Sans différences : la toute première étape n'utilise que des chiffres bruts du dividende
    // (déjà visibles dans l'en-tête) -- elle reste mentale. Pour les étapes suivantes, chaque
    // "valeur" (ex. 117) contient déjà le reste précédent dans ses premiers chiffres (le "11"
    // de 117) : pas besoin de l'écrire une seconde fois à part. Seul le tout dernier reste,
    // qui n'est jamais repris dans une valeur suivante, s'écrit séparément à la fin.
    let firstTrigger = true;
    res.steps.forEach((s,i)=>{
      if(s.sub>0){
        if(firstTrigger){ firstTrigger = false; return; }
        rows.push({cells: dpAlignedCells(vierge?'':String(s.value), i, N)});
      }
    });
    rows.push({cells: dpAlignedCells(vierge?'':String(res.remainder), N-1, N)});
  }
  // En mode vierge : le dividende ET le diviseur restent visibles (l'élève doit les connaître
  // pour démarrer) ; le quotient, le détail des étapes, ET toute préparation (signe moins,
  // trait de soustraction) sont masqués -- l'espace reste entièrement vierge. Le nombre de
  // lignes reste calculé sur la vraie division : la hauteur totale anticipe donc correctement
  // le nombre d'étapes à venir, sans donner d'indice sur leur déroulé.
  const table = dpRenderDivisionTable(rows, vierge?'':res.quotient, res.divisor, undefined, vierge);
  if(vierge) return `<div style="margin:10px 0;padding:14px 0;">${table}</div>`;
  return `<div style="margin:10px 0;padding:14px 0;">${table}</div>
  <p class="hint" style="margin:0;">${res.dividend} = (${res.divisor} × ${res.quotient}) + ${res.remainder}</p>`;
}
function buildDivisionStages(res){
  const dividendStr = String(res.dividend);
  const N = dividendStr.length;
  const rows = [{cells: dpAlignedCells(dividendStr, N-1, N), bold:true}];
  const stages = [];
  let quotientSoFar = '';
  stages.push({rows: rows.slice(), quotient: '', caption: `On pose la division de ${res.dividend} par ${res.divisor}.`});
  res.steps.forEach((s,i)=>{
    if(s.qDigit===null){
      stages.push({rows: rows.slice(), quotient: quotientSoFar, caption: `On prend le nombre ${s.value} : il est inférieur à ${res.divisor}, donc on prend un chiffre de plus.`});
    } else if(s.sub>0){
      rows.push({cells: dpAlignedCells(String(s.sub), i, N), sign:true, underline:true, endCol:i});
      rows.push({cells: dpAlignedCells(String(s.value-s.sub), i, N)});
      quotientSoFar += s.qDigit;
      stages.push({rows: rows.slice(), quotient: quotientSoFar, caption: `${res.divisor} × ${s.qDigit} = ${s.sub}, le plus proche de ${s.value} sans le dépasser. ${s.value} − ${s.sub} = ${s.value-s.sub}.`});
    } else {
      quotientSoFar += '0';
      stages.push({rows: rows.slice(), quotient: quotientSoFar, caption: `On abaisse le chiffre suivant du dividende. ${s.value} reste inférieur à ${res.divisor}, donc on pose 0 au quotient et on abaisse encore.`});
    }
  });
  stages.push({rows: rows.slice(), quotient: String(res.quotient), caption: `La division est terminée : ${res.dividend} = (${res.divisor} × ${res.quotient}) + ${res.remainder}.`, final:true});
  return stages;
}
function divisionStagesHTML(stages, res){
  const panels = stages.map((st,i)=>`<div style="margin:10px 0;padding:14px 0;">
    ${dpRenderDivisionTable(st.rows, st.quotient, res.divisor)}
    <p class="hint" style="margin:8px 0 0;">${i+1}. ${st.caption}</p>
  </div>`).join('');
  return panels;
}
function previewDivisionPosee(){
  const a = parseInt(document.getElementById('divDividende').value);
  const b = parseInt(document.getElementById('divDiviseur').value);
  const res = computeDivisionPosee(a,b);
  if(!res){ document.getElementById('divisionPreview').innerHTML = divisionPoseeHTML(null); return; }
  const stepByStep = document.getElementById('divStepByStep').checked;
  const vierge = document.getElementById('divVierge').checked;
  const showDiff = document.getElementById('divShowDiff').checked;
  document.getElementById('divisionPreview').innerHTML = (stepByStep && !vierge) ? divisionStagesHTML(buildDivisionStages(res), res) : divisionPoseeHTML(res, vierge, showDiff);
}
function openDivisionTool(){activateToolTab('divisionGroupWrap','divTabEucl','divTabDec'); document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('divisionPanel').style.display='block';
  document.getElementById('divisionPreview').innerHTML = '';
  document.getElementById('divisionPanel').scrollIntoView({behavior:'smooth', block:'nearest'});
}
function closeDivisionTool(){document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('divisionPanel').style.display='none'; }
function insertDivisionPosee(){
  const a = parseInt(document.getElementById('divDividende').value);
  const b = parseInt(document.getElementById('divDiviseur').value);
  const res = computeDivisionPosee(a,b);
  if(!res){ document.getElementById('divisionPreview').innerHTML = divisionPoseeHTML(null); return; }
  const stepByStep = document.getElementById('divStepByStep').checked;
  const vierge = document.getElementById('divVierge').checked;
  const showDiff = document.getElementById('divShowDiff').checked;
  const html = (stepByStep && !vierge) ? divisionStagesHTML(buildDivisionStages(res), res) : divisionPoseeHTML(res, vierge, showDiff);
  addPendingBlock('divisionPosee', html, {a,b,stepByStep,vierge,showDiff}, 'reopenDivisionPosee');
  closeDivisionTool();
}
function reopenDivisionPosee(data){
  openDivisionTool();
  document.getElementById('divDividende').value = data.a;
  document.getElementById('divDiviseur').value = data.b;
  document.getElementById('divVierge').checked = !!data.vierge;
  document.getElementById('divStepByStep').checked = data.stepByStep;
  document.getElementById('divShowDiff').checked = data.showDiff!==false;
  previewDivisionPosee();
}
/* ============================================================
   Nouveaux ajouts pour l'outil de correction : division décimale,
   axe gradué, repère, disque fractionné, rectangle fractionné.
   Même convention que les ajouts existants : un panneau, un aperçu,
   un bouton "Insérer" qui ajoute un bloc indépendant à pendingBlocks
   -- donc ces ajouts apparaissent automatiquement aussi dans la
   fenêtre de projection, et peuvent être modifiés/supprimés un par
   un (renderCorrectionPreview transmet pendingBlocksHTML(false) à
   updateProjectionWindow).
   ============================================================ */

/* ---- Division décimale (poursuite après la virgule) ---- */
function computeDivisionDecimale(dividendRaw, divisor, maxDec){
  const cleanStr = String(dividendRaw).trim().replace(',', '.');
  if(!/^\d+(\.\d+)?$/.test(cleanStr)) return null;
  if(!Number.isInteger(divisor) || divisor<=0) return null;
  const [intPart, decPart=''] = cleanStr.split('.');
  const digits = (intPart + decPart).split('').map(Number);
  const givenCommaPos = decPart.length>0 ? intPart.length : null; // index dans "digits" où la virgule DONNÉE se situe
  const dividendValue = parseFloat(cleanStr);
  let current = 0, quotient = '', commaCol = null, started = false, repeating = false;
  const steps = [];
  let idx = 0;
  let decCount = 0, exact = false;
  const seenRemainders = new Set();
  while(true){
    let bringDown;
    if(idx < digits.length){
      bringDown = digits[idx];
      if(givenCommaPos!==null && idx===givenCommaPos && commaCol===null){ commaCol = idx; quotient += ','; }
    } else{
      if(decCount>=maxDec) break;
      bringDown = 0;
      decCount++;
      if(commaCol===null){ commaCol = idx; quotient += ','; }
    }
    current = current*10 + bringDown;
    const qDigit = Math.floor(current/divisor);
    const sub = qDigit*divisor;
    const after = current - sub;
    // on ignore les tout premiers chiffres insuffisants seuls (ex. le "1" de "10÷3") : on ne
    // commence à afficher une étape qu'une fois le premier chiffre du quotient obtenu, ou
    // arrivé au dernier chiffre de la partie entière DONNÉE (avant une éventuelle virgule).
    if(started || qDigit>0 || idx>=digits.length-1){
      steps.push({before: current, qDigit, sub, after, col: idx});
      started = true;
      quotient += String(qDigit);
    }
    current = after;
    idx++;
    if(current===0 && idx>=digits.length){ exact=true; break; }
    if(commaCol!==null && idx>digits.length){
      // dans la partie décimale ajoutée (zéros) : si ce reste est déjà apparu, le motif se
      // répète à l'identique indéfiniment -- inutile de continuer à dérouler les mêmes lignes.
      if(seenRemainders.has(current)){ repeating = true; break; }
      seenRemainders.add(current);
    }
    if(idx - digits.length > 60) break; // garde-fou
  }
  quotient = quotient.replace(/^0+(\d)/, '$1') || '0';
  const dividendDisplay = cleanStr.replace('.', ',');
  return {dividend: dividendDisplay, dividendValue, divisor, quotient, exact, steps, decCount, repeating, digits, givenCommaPos};
}
function divisionDecimaleHTML(res, maxDec, vierge){
  if(!res) return '<p class="hint" style="color:var(--accent-orange);">Le dividende doit être un nombre décimal ou entier positif, le diviseur un entier positif.</p>';
  const dividendDigitsStr = res.digits.join('');
  const totalCols = Math.max(dividendDigitsStr.length, ...res.steps.map(s=>s.col+1));
  const rows = [{cells: dpAlignedCells(dividendDigitsStr, dividendDigitsStr.length-1, totalCols), bold:true}];
  res.steps.forEach((s,i)=>{
    rows.push({cells: dpAlignedCells(vierge?'':String(s.sub), s.col, totalCols), sign:!vierge, underline:!vierge, endCol:s.col});
    const next = res.steps[i+1];
    if(next) rows.push({cells: dpAlignedCells(vierge?'':String(next.before), next.col, totalCols)});
    else rows.push({cells: dpAlignedCells(vierge?'':String(s.after), s.col, totalCols)});
  });
  const commaColIdx = vierge ? undefined : (res.givenCommaPos!==null && res.givenCommaPos!==undefined ? res.givenCommaPos-1 : undefined);
  // En mode vierge : dividende et diviseur restent visibles ; quotient, détail des étapes, ET
  // toute préparation (signe moins, trait de soustraction, marqueur de virgule) sont masqués --
  // l'espace reste entièrement vierge. La hauteur reste calculée sur la vraie division.
  const table = dpRenderDivisionTable(rows, vierge?'':(res.quotient + (res.repeating?'…':'')), res.divisor, commaColIdx, vierge);
  return `<div style="margin:10px 0;padding:14px 0;">
    ${table}
  </div>`;
}
function previewDivisionDecimale(){
  const a = document.getElementById('divDecDividende').value;
  const b = parseInt(document.getElementById('divDecDiviseur').value);
  const maxDec = parseInt(document.getElementById('divDecMax').value)||4;
  const vierge = document.getElementById('divDecVierge').checked;
  const res = computeDivisionDecimale(a,b,maxDec);
  document.getElementById('divisionDecPreview').innerHTML = divisionDecimaleHTML(res, maxDec, vierge);
}
function openDivisionDecTool(){activateToolTab('divisionGroupWrap','divTabDec','divTabEucl'); document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('divisionDecPanel').style.display='block';
  document.getElementById('divisionDecPreview').innerHTML = '';
  document.getElementById('divisionDecPanel').scrollIntoView({behavior:'smooth', block:'nearest'});
}
function closeDivisionDecTool(){document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('divisionDecPanel').style.display='none'; }
function insertDivisionDecimale(){
  const a = document.getElementById('divDecDividende').value;
  const b = parseInt(document.getElementById('divDecDiviseur').value);
  const maxDec = parseInt(document.getElementById('divDecMax').value)||4;
  const vierge = document.getElementById('divDecVierge').checked;
  const res = computeDivisionDecimale(a,b,maxDec);
  if(!res) return;
  addPendingBlock('divisionDec', divisionDecimaleHTML(res, maxDec, vierge), {a,b,maxDec,vierge}, 'reopenDivisionDec');
  closeDivisionDecTool();
}
function reopenDivisionDec(data){
  openDivisionDecTool();
  document.getElementById('divDecDividende').value = data.a;
  document.getElementById('divDecDiviseur').value = data.b;
  document.getElementById('divDecMax').value = data.maxDec;
  document.getElementById('divDecVierge').checked = !!data.vierge;
  previewDivisionDecimale();
  renderCorrectionPreview();
}

/* ---- Axe gradué ---- */
/* Valeur d'une coordonnée : nombre décimal (virgule) ou fraction (a/b). On garde le
   dénominateur de la fraction pour pouvoir subdiviser l'axe en conséquence. */
function parseCoordValue(str){
  str = (str||'').trim();
  // nombre mixte : entier + fraction, ex. "1+1/4" (= 1,25)
  const mixed = str.match(/^(-?\d+)\s*\+\s*(\d+)\s*\/\s*(\d+)$/);
  if(mixed){
    const whole = parseInt(mixed[1],10), n = parseInt(mixed[2],10), den = parseInt(mixed[3],10);
    const sign = whole<0 ? -1 : 1;
    return {value: whole + sign*(n/den), den};
  }
  const fm = str.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if(fm){ const den=parseInt(fm[2],10); return {value: parseInt(fm[1],10)/den, den}; }
  return {value: parseFloat(str.replace(',','.')), den: null};
}
/* Repère les points au format "A(3,5)" ou "A(3/4)" n'importe où dans le texte (peu importe
   ce qui sépare plusieurs points : espace, virgule, point-virgule...). */
function parseNamedPoints1D(raw){
  if(!raw||!raw.trim()) return [];
  const out = [];
  for(const m of raw.matchAll(/([A-Za-z]+)\s*\(\s*([^()]+?)\s*\)/g)){
    const {value, den} = parseCoordValue(m[2]);
    if(!isNaN(value)) out.push({label:m[1], value, den});
  }
  return out;
}
/* Formate un nombre en écriture française (virgule décimale, pas de zéros inutiles). */
function frDecimal(n){
  return Number(n.toFixed(6)).toString().replace('.', ',');
}
/* Réécrit une valeur pour l'affichage dans une consigne : si elle a été donnée sous forme
   fractionnaire (den connu), on la redonne sous cette même forme plutôt qu'en décimal -- ex.
   A(2/5) doit rester "2/5" dans la consigne, pas devenir "0,4". */
function fracLabel(value, den){
  if(den){ return katexSpan(`\\dfrac{${Math.round(value*den)}}{${den}}`); }
  return frDecimal(value);
}
function buildAxeSvg(min,max,step,points,manualSubDiv,mode){
  const W=560,H=110,padX=30,y=55;
  const scale = (W-2*padX)/(max-min);
  const xOf = v => padX + (v-min)*scale;
  let ticks='';
  for(let v=Math.ceil(min/step)*step; v<=max+1e-9; v+=step){
    const x = xOf(v);
    const isZero = Math.abs(v)<1e-9;
    ticks += `<line x1="${x}" y1="${y-7}" x2="${x}" y2="${y+7}" stroke="#1C1B2E" stroke-width="${isZero?2:1.3}"/>
      <text x="${x}" y="${y+24}" font-size="13" text-anchor="middle" font-family="JetBrains Mono, monospace">${frDecimal(v)}</text>`;
  }
  // Subdivision de chaque unité selon le PPCM des dénominateurs demandés (ex. 1/4 et 7/6
  // donnent un PPCM de 12 : chaque unité est coupée en douzièmes, ce qui convient aux deux) et/ou
  // le partage manuel choisi (utile pour un axe VIERGE, sans point, où les élèves placeront
  // eux-mêmes des fractions -- ex. partager en 4 sans aucun point donné).
  const dens = (points||[]).map(p=>p.den).filter(Boolean);
  if(manualSubDiv>1) dens.push(manualSubDiv);
  if(dens.length){
    const gcd = (a,b) => b===0 ? a : gcd(b, a%b);
    const lcm = (a,b) => a*b/gcd(a,b);
    const subDiv = dens.reduce((acc,d)=>lcm(acc,d), 1);
    if(subDiv<=60){
    let minorTicks = '';
    for(let v=Math.ceil(min*subDiv)/subDiv; v<=max+1e-9; v+=1/subDiv){
      if(Math.abs(v % step) < 1e-6 || Math.abs((v%step)-step) < 1e-6) continue; // déjà une grande graduation
      minorTicks += `<line x1="${xOf(v)}" y1="${y-4}" x2="${xOf(v)}" y2="${y+4}" stroke="#1C1B2E" stroke-width="1"/>`;
    }
    ticks += minorTicks;
    }
  }
  let pts='';
  // Mode "placer" : compétence = placer soi-même les points -- on ne les dessine pas, une
  // consigne les liste à part (voir plus bas). Mode "lecture" (par défaut) : les points sont
  // déjà placés, à l'élève de lire/écrire leur abscisse.
  if(mode!=='placer'){
    (points||[]).forEach(p=>{
      if(p.value<min||p.value>max) return;
      const x = xOf(p.value);
      pts += `<circle cx="${x}" cy="${y}" r="4.5" fill="#FF8208"/>
        <text x="${x}" y="${y-14}" font-size="14" font-weight="700" text-anchor="middle" fill="#FF8208" font-family="Space Grotesk, sans-serif">${p.label}</text>`;
    });
  }
  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:560px;display:block;margin:6px auto;">
    <line x1="${padX-10}" y1="${y}" x2="${W-padX+10}" y2="${y}" stroke="#1C1B2E" stroke-width="1.6" marker-end="url(#axeArrow)"/>
    <defs><marker id="axeArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#1C1B2E"/></marker></defs>
    ${ticks}${pts}
  </svg>`;
  if(mode==='placer' && points && points.length){
    const liste = points.map(p=>`${p.label}(${fracLabel(p.value,p.den)})`).join(' ; ');
    return svg + `<p class="hint" style="text-align:center;margin:4px 0 0;">Place les points ${liste}</p>`;
  }
  return svg;
}
function previewAxe(){
  const min=parseFloat(document.getElementById('axeMin').value), max=parseFloat(document.getElementById('axeMax').value), step=parseFloat(document.getElementById('axeStep').value)||1;
  const subDiv=parseInt(document.getElementById('axeSubDiv').value)||1;
  const mode = document.getElementById('axeMode').value;
  const points = parseNamedPoints1D(document.getElementById('axePoints').value);
  document.getElementById('axePreview').innerHTML = (max>min&&step>0) ? buildAxeSvg(min,max,step,points,subDiv,mode) : '<p class="hint" style="color:var(--accent-orange);">Le maximum doit être supérieur au minimum, le pas positif.</p>';
}
function openAxeTool(){activateToolTab('axeGroupWrap','axeTabAxe','axeTabRep'); document.getElementById('toolsModalOverlay').style.display='flex'; document.getElementById('axePanel').style.display='block'; document.getElementById('axePreview').innerHTML=''; document.getElementById('axePanel').scrollIntoView({behavior:'smooth',block:'nearest'}); }
function closeAxeTool(){document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('axePanel').style.display='none'; }
function insertAxe(){
  const min=parseFloat(document.getElementById('axeMin').value), max=parseFloat(document.getElementById('axeMax').value), step=parseFloat(document.getElementById('axeStep').value)||1;
  if(!(max>min&&step>0)) return;
  const subDiv=parseInt(document.getElementById('axeSubDiv').value)||1;
  const mode = document.getElementById('axeMode').value;
  const pointsRaw = document.getElementById('axePoints').value;
  const points = parseNamedPoints1D(pointsRaw);
  addPendingBlock('axe', buildAxeSvg(min,max,step,points,subDiv,mode), {min,max,step,subDiv,mode,pointsRaw}, 'reopenAxe');
  closeAxeTool();
}
function reopenAxe(data){
  openAxeTool();
  document.getElementById('axeMin').value = data.min;
  document.getElementById('axeMax').value = data.max;
  document.getElementById('axeStep').value = data.step;
  document.getElementById('axeSubDiv').value = data.subDiv||1;
  document.getElementById('axeMode').value = data.mode||'lecture';
  document.getElementById('axePoints').value = data.pointsRaw;
  previewAxe();
}

/* ---- Repère (2D) ---- */
/* Repère les points au format "A(3,5;-2)" : x et y séparés par ";", chacun pouvant utiliser
   la virgule décimale (ex. 3,5) ou une fraction (ex. 3/4). */
function parseNamedPoints2D(raw){
  if(!raw||!raw.trim()) return [];
  const out = [];
  for(const m of raw.matchAll(/([A-Za-z]+)\s*\(\s*([^()]+?)\s*\)/g)){
    const parts = m[2].split(';');
    if(parts.length<2) continue;
    const cx = parseCoordValue(parts[0]), cy = parseCoordValue(parts[1]);
    if(isNaN(cx.value)||isNaN(cy.value)) continue;
    out.push({label:m[1], x:cx.value, y:cy.value, xDen:cx.den, yDen:cy.den});
  }
  return out;
}
function buildRepereSvg(xMin,xMax,yMin,yMax,points,mode){
  const W=420,H=420,pad=26;
  const sx = (W-2*pad)/(xMax-xMin), sy=(H-2*pad)/(yMax-yMin);
  const X = v => pad + (v-xMin)*sx;
  const Y = v => H-pad-(v-yMin)*sy;
  let grid='';
  for(let v=Math.ceil(xMin); v<=xMax; v++) grid += `<line x1="${X(v)}" y1="${pad}" x2="${X(v)}" y2="${H-pad}" stroke="rgba(28,43,57,.12)" stroke-width="1"/>`;
  for(let v=Math.ceil(yMin); v<=yMax; v++) grid += `<line x1="${pad}" y1="${Y(v)}" x2="${W-pad}" y2="${Y(v)}" stroke="rgba(28,43,57,.12)" stroke-width="1"/>`;
  const showOrigin = xMin<=0 && xMax>=0 && yMin<=0 && yMax>=0;
  const axes = `<line x1="${pad-10}" y1="${Y(0)}" x2="${W-pad+10}" y2="${Y(0)}" stroke="#1C1B2E" stroke-width="1.6" marker-end="url(#repAxeArrowX)"/>
    <line x1="${X(0)}" y1="${H-pad+10}" x2="${X(0)}" y2="${pad-10}" stroke="#1C1B2E" stroke-width="1.6" marker-end="url(#repAxeArrowY)"/>`;
  const originLabel = showOrigin ? `<text x="${X(0)-12}" y="${Y(0)+18}" font-size="15" font-weight="700" font-family="Space Grotesk, sans-serif">O</text>` : '';
  let pts='';
  // Mode "placer" : les points ne sont pas dessinés (une consigne les liste à part) -- l'élève
  // doit les placer lui-même. Mode "lecture" (par défaut) : déjà placés, à lire/écrire.
  if(mode!=='placer'){
    (points||[]).forEach(p=>{
      pts += `<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="4.5" fill="#FF8208"/>
        <text x="${X(p.x)+8}" y="${Y(p.y)-8}" font-size="14" font-weight="700" fill="#FF8208" font-family="Space Grotesk, sans-serif">${p.label}</text>`;
    });
  }
  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:340px;display:block;margin:6px auto;">
    <defs>
      <marker id="repAxeArrowX" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#1C1B2E"/></marker>
      <marker id="repAxeArrowY" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#1C1B2E"/></marker>
    </defs>
    ${grid}${axes}${originLabel}${pts}
    <text x="${X(1)}" y="${Y(0)+16}" font-size="12" font-family="JetBrains Mono, monospace">1</text>
    <text x="${X(0)-14}" y="${Y(1)+4}" font-size="12" font-family="JetBrains Mono, monospace">1</text>
  </svg>`;
  if(mode==='placer' && points && points.length){
    const liste = points.map(p=>`${p.label}(${fracLabel(p.x,p.xDen)} ; ${fracLabel(p.y,p.yDen)})`).join(' ; ');
    return svg + `<p class="hint" style="text-align:center;margin:4px 0 0;">Place les points ${liste}</p>`;
  }
  return svg;
}
function previewRepere(){
  const xMin=parseFloat(document.getElementById('repXMin').value), xMax=parseFloat(document.getElementById('repXMax').value);
  const yMin=parseFloat(document.getElementById('repYMin').value), yMax=parseFloat(document.getElementById('repYMax').value);
  const mode = document.getElementById('repMode').value;
  const points = parseNamedPoints2D(document.getElementById('repPoints').value);
  document.getElementById('reperePreview').innerHTML = (xMax>xMin&&yMax>yMin) ? buildRepereSvg(xMin,xMax,yMin,yMax,points,mode) : '<p class="hint" style="color:var(--accent-orange);">Les maximums doivent être supérieurs aux minimums.</p>';
}
function openRepereTool(){activateToolTab('axeGroupWrap','axeTabRep','axeTabAxe'); document.getElementById('toolsModalOverlay').style.display='flex'; document.getElementById('reperePanel').style.display='block'; document.getElementById('reperePreview').innerHTML=''; document.getElementById('reperePanel').scrollIntoView({behavior:'smooth',block:'nearest'}); }
function closeRepereTool(){document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('reperePanel').style.display='none'; }
function insertRepere(){
  const xMin=parseFloat(document.getElementById('repXMin').value), xMax=parseFloat(document.getElementById('repXMax').value);
  const yMin=parseFloat(document.getElementById('repYMin').value), yMax=parseFloat(document.getElementById('repYMax').value);
  if(!(xMax>xMin&&yMax>yMin)) return;
  const mode = document.getElementById('repMode').value;
  const pointsRaw = document.getElementById('repPoints').value;
  const points = parseNamedPoints2D(pointsRaw);
  addPendingBlock('repere', buildRepereSvg(xMin,xMax,yMin,yMax,points,mode), {xMin,xMax,yMin,yMax,mode,pointsRaw}, 'reopenRepere');
  closeRepereTool();
}
function reopenRepere(data){
  openRepereTool();
  document.getElementById('repXMin').value = data.xMin;
  document.getElementById('repXMax').value = data.xMax;
  document.getElementById('repYMin').value = data.yMin;
  document.getElementById('repYMax').value = data.yMax;
  document.getElementById('repMode').value = data.mode||'lecture';
  document.getElementById('repPoints').value = data.pointsRaw;
  previewRepere();
}

/* ---- Disque fractionné ---- */
function singleDisqueSvg(filled, den){
  const W=220,H=220,cx=110,cy=110,r=90;
  let parts='';
  for(let i=0;i<den;i++){
    const a0 = -Math.PI/2 + i*2*Math.PI/den, a1 = -Math.PI/2 + (i+1)*2*Math.PI/den;
    const x0=cx+r*Math.cos(a0), y0=cy+r*Math.sin(a0), x1=cx+r*Math.cos(a1), y1=cy+r*Math.sin(a1);
    const large = (2*Math.PI/den)>Math.PI ? 1:0;
    parts += `<path d="M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z" fill="${i<filled?'#FF8208':'#fff'}" stroke="#1C1B2E" stroke-width="1.6"/>`;
  }
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;">${parts}</svg>`;
}
/* Si le numérateur dépasse le dénominateur (fraction impropre, ex. 5/4), il faut plusieurs
   disques : autant de disques complets que nécessaire, le dernier ne montrant que le reste. */
/* Ligne de réponse à compléter, sous la forme demandée (l'élève écrit lui-même les nombres). */
/* Une "case" de fraction à compléter, avec une vraie barre horizontale (comme une fraction
   habituelle), pas un simple "/". */
function fractionBlankHTML(){
  return `<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;margin:0 4px;line-height:1.3;">
    <span>....</span>
    <span style="display:block;width:100%;border-top:1.5px solid #20242E;"></span>
    <span>....</span>
  </span>`;
}
/* Légende avec partie entière RÉELLEMENT CALCULÉE (ex. "7/3 = 2 + 1/3"), distincte de
   fractionAnswerHTML (qui produit un exercice à trous ".... + .../...." pour l'élève). Ne
   s'applique que si la fraction est bien impropre (num > den) et que showMixte est coché ;
   si num est un multiple exact de den, la partie fractionnaire est nulle, donc on affiche
   juste l'entier plutôt que "... + 0/...", qui n'aurait pas de sens. */
function buildFractionCaptionWithMixte(fracKatex, num, den, showMixte){
  if(!showMixte || num<=den) return fracKatex;
  const whole = Math.floor(num/den), rem = num - whole*den;
  if(rem===0) return `${fracKatex} = ${whole}`;
  const mixteKatex = katexSpan(`${whole} + \\dfrac{${rem}}{${den}}`);
  return `${fracKatex} = ${mixteKatex}`;
}
function fractionAnswerHTML(reponseSimple, reponseMixte){
  if(!reponseSimple && !reponseMixte) return '';
  const parts = [];
  if(reponseSimple) parts.push(fractionBlankHTML());
  if(reponseMixte) parts.push(`.... + ${fractionBlankHTML()}`);
  return `<p style="text-align:center;margin:8px 0 0;font-size:1.05rem;">${parts.join('&nbsp;&nbsp;&nbsp;ou&nbsp;&nbsp;&nbsp;')}</p>`;
}
function buildDisqueSvg(num,den,vierge,showCaption,reponseSimple,reponseMixte,showMixte){
  const nShapes = Math.max(1, Math.ceil(num/den));
  let discs = '';
  for(let i=0;i<nShapes;i++){
    const filled = vierge ? 0 : Math.max(0, Math.min(den, num - i*den));
    // chaque disque est plafonné à 150px : seul, il ne s'étire pas sur toute la largeur
    // disponible ; à plusieurs (fraction impropre), ils se partagent la largeur en rétrécissant.
    discs += `<div style="flex:1 1 0;max-width:150px;min-width:50px;">${singleDisqueSvg(filled, den)}</div>`;
  }
  const fracKatex = katexSpan(`\\dfrac{${num}}{${den}}`);
  const caption = vierge ? `Colorie ${fracKatex} du disque` : buildFractionCaptionWithMixte(fracKatex, num, den, showMixte);
  return `<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;max-width:${nShapes*150+((nShapes-1)*10)}px;margin:0 auto;">${discs}</div>
    ${showCaption!==false ? `<p class="hint" style="text-align:center;margin:4px 0 0;">${caption}</p>` : ''}
    ${fractionAnswerHTML(reponseSimple, reponseMixte)}`;
}
function previewDisque(){
  const num=parseInt(document.getElementById('disqueNum').value), den=parseInt(document.getElementById('disqueDen').value);
  const vierge = document.getElementById('disqueVierge').checked;
  const showCaption = document.getElementById('disqueShowCaption').checked;
  const showMixte = document.getElementById('disqueShowMixte').checked;
  const reponseSimple = document.getElementById('disqueReponseSimple').checked;
  const reponseMixte = document.getElementById('disqueReponseMixte').checked;
  document.getElementById('disquePreview').innerHTML = (den>0&&num>=0) ? buildDisqueSvg(num,den,vierge,showCaption,reponseSimple,reponseMixte,showMixte) : '';
}
function openDisqueTool(){activateToolTab('shapeGroupWrap','shapeTabDisque','shapeTabRect'); document.getElementById('toolsModalOverlay').style.display='flex'; document.getElementById('disquePanel').style.display='block'; document.getElementById('disquePreview').innerHTML=''; document.getElementById('disquePanel').scrollIntoView({behavior:'smooth',block:'nearest'}); }
function closeDisqueTool(){document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('disquePanel').style.display='none'; }
function insertDisque(){
  const num=parseInt(document.getElementById('disqueNum').value), den=parseInt(document.getElementById('disqueDen').value);
  const vierge = document.getElementById('disqueVierge').checked;
  const showCaption = document.getElementById('disqueShowCaption').checked;
  const showMixte = document.getElementById('disqueShowMixte').checked;
  const reponseSimple = document.getElementById('disqueReponseSimple').checked;
  const reponseMixte = document.getElementById('disqueReponseMixte').checked;
  if(!(den>0&&num>=0)) return;
  addPendingBlock('disque', buildDisqueSvg(num,den,vierge,showCaption,reponseSimple,reponseMixte,showMixte), {num,den,vierge,showCaption,reponseSimple,reponseMixte,showMixte}, 'reopenDisque');
  closeDisqueTool();
}
function reopenDisque(data){
  openDisqueTool();
  document.getElementById('disqueNum').value = data.num;
  document.getElementById('disqueDen').value = data.den;
  document.getElementById('disqueVierge').checked = !!data.vierge;
  document.getElementById('disqueShowCaption').checked = data.showCaption!==false;
  document.getElementById('disqueShowMixte').checked = !!data.showMixte;
  document.getElementById('disqueReponseSimple').checked = !!data.reponseSimple;
  document.getElementById('disqueReponseMixte').checked = !!data.reponseMixte;
  previewDisque();
}

/* ---- Rectangle fractionné ---- */
function singleRectFracSvg(filledSet, den, vertical, interactive){
  const W=180,H=90;
  let parts='';
  for(let i=0;i<den;i++){
    const filled = filledSet.has(i);
    const click = interactive ? ` onclick="toggleRectFracCell(${i})" style="cursor:pointer;"` : '';
    if(vertical){
      const w = W/den;
      parts += `<rect x="${i*w}" y="0" width="${w}" height="${H}" fill="${filled?'#FF8208':'#fff'}" stroke="#1C1B2E" stroke-width="1.6"${click}/>`;
    } else {
      const h = H/den;
      parts += `<rect x="0" y="${i*h}" width="${W}" height="${h}" fill="${filled?'#FF8208':'#fff'}" stroke="#1C1B2E" stroke-width="1.6"${click}/>`;
    }
  }
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;">${parts}</svg>`;
}
/* Partage en grille (lignes × colonnes à la fois) : pédagogiquement plus parlant qu'un simple
   partage à sens unique pour un dénominateur composé (ex. 1/6 vu comme une grille 2×3), en
   montrant clairement les deux facteurs du dénominateur. Remplissage case par case, de gauche
   à droite puis de haut en bas, comme la lecture. */
function singleRectGridSvg(filledSet, nRows, nCols, interactive){
  const W=180,H=90;
  const cw = W/nCols, ch = H/nRows;
  let parts='';
  for(let r=0;r<nRows;r++){
    for(let c=0;c<nCols;c++){
      const idx = r*nCols+c;
      const filled = filledSet.has(idx);
      const click = interactive ? ` onclick="toggleRectFracCell(${idx})" style="cursor:pointer;"` : '';
      parts += `<rect x="${c*cw}" y="${r*ch}" width="${cw}" height="${ch}" fill="${filled?'#FF8208':'#fff'}" stroke="#1C1B2E" stroke-width="1.6"${click}/>`;
    }
  }
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;">${parts}</svg>`;
}
/* Comme pour les disques : un numérateur supérieur au dénominateur (fraction impropre) a
   besoin de plusieurs rectangles, le dernier ne montrant que le reste. */
/* ---- Cubes empilés (perspective cavalière) ---- */
/* Perspective cavalière classique : la face avant est un vrai carré (pas de déformation), et
   la profondeur (z) part en oblique à 45° avec un coefficient de réduction de 0,5 -- exactement
   la convention utilisée dans les manuels français. Un cube occupe une case entière de la
   grille (x=droite, y=hauteur, z=profondeur), coordonnées entières. */
/* ---- Graphique (droites et fonctions, plusieurs courbes superposées) ---- */
/* Évalue une expression de fonction en x (ex. "2x-1", "x^2-3", "sqrt(x)"), avec les mêmes
   commodités d'écriture que le reste du site (multiplication implicite, ^ pour la puissance).
   Retourne NaN si l'expression est invalide ou non définie en ce point (sécurisé : pas d'accès
   au DOM ni à autre chose que Math, uniquement utilisé pour tracer une courbe). */
function evalFunctionExpr(expr, x){
  try{
    let js = expr
      .replace(/\^/g, '**')
      .replace(/\bsqrt\(/g, 'Math.sqrt(')
      .replace(/\bsin\(/g, 'Math.sin(')
      .replace(/\bcos\(/g, 'Math.cos(')
      .replace(/\btan\(/g, 'Math.tan(')
      .replace(/\bexp\(/g, 'Math.exp(')
      .replace(/\bln\(/g, 'Math.log(')
      .replace(/\babs\(/g, 'Math.abs(')
      .replace(/\bpi\b/gi, 'Math.PI')
      .replace(/(\d)\s*x/g, '$1*x')
      .replace(/(\d)\s*\(/g, '$1*(')
      .replace(/\)\s*\(/g, ')*(')
      .replace(/x\s*\(/g, 'x*(');
    if(!/^[0-9x+\-*/.,()\sA-Za-z]*$/.test(js)) return NaN; // caractères inattendus : on refuse
    const f = new Function('x', 'with(Math){ return ('+js+'); }');
    const v = f(x);
    return (typeof v==='number' && isFinite(v)) ? v : NaN;
  }catch(e){ return NaN; }
}
const GRAPH_COLORS = ['#0D5BA3','#D93025','#1F7A4D','#B26A00','#7B3FA0','#1C8C9C'];
let graphSvgIdCounter = 1;
/* ---- Diagrammes statistiques (camembert, barres, bâtons, histogramme) ---- */
/* Choisit un pas de graduation "rond" (1, 2, 5, 10, 20, 50...) proche de max/nDivisions --
   évite des graduations disgracieuses comme "tous les 3,7". */
function niceStep(maxV, target){
  target = target || 6;
  const raw = maxV/target;
  const mag = Math.pow(10, Math.floor(Math.log10(raw||1)));
  const norm = raw/mag;
  const step = norm<1.5 ? 1 : norm<3.5 ? 2 : norm<7.5 ? 5 : 10;
  return step*mag;
}
function pieChartSvg(data){
  const W=300,H=300,cx=150,cy=150,r=115;
  const total = data.reduce((s,d)=>s+(d.value||0),0) || 1;
  let angle = -90, paths='', labels='';
  data.forEach((d,i)=>{
    const v = d.value||0;
    const color = d.color || GRAPH_COLORS[i%GRAPH_COLORS.length];
    const sweep = (v/total)*360;
    if(sweep<=0){ return; }
    const a1 = angle*Math.PI/180, a2 = (angle+sweep)*Math.PI/180;
    const x1 = cx+r*Math.cos(a1), y1 = cy+r*Math.sin(a1);
    const x2 = cx+r*Math.cos(a2), y2 = cy+r*Math.sin(a2);
    const largeArc = sweep>180 ? 1 : 0;
    paths += `<path d="M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${largeArc} 1 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${color}" stroke="#fff" stroke-width="2"/>`;
    const mid = (angle+sweep/2)*Math.PI/180;
    const pct = Math.round(v/total*100);
    if(pct>=5){
      const lx = cx+(r*0.62)*Math.cos(mid), ly = cy+(r*0.62)*Math.sin(mid);
      labels += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-size="13" fill="#fff" text-anchor="middle" font-weight="700" font-family="Space Grotesk, sans-serif">${pct}%</text>`;
    }
    angle += sweep;
  });
  const legend = data.map((d,i)=>{
    const color = d.color || GRAPH_COLORS[i%GRAPH_COLORS.length];
    return `<span style="display:inline-flex;align-items:center;gap:6px;margin:2px 12px 2px 0;"><span style="width:12px;height:12px;border-radius:3px;background:${color};display:inline-block;flex:none;"></span><span style="font-size:.85rem;">${escapeHtml(d.label||'')} (${d.value})</span></span>`;
  }).join('');
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:300px;display:block;margin:6px auto;">${paths}${labels}</svg>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;margin-top:6px;">${legend}</div>`;
}
/* Diagrammes en barres, en bâtons et histogrammes partagent le même squelette (axes, graduations
   Y, étiquettes X) ; seule la largeur/l'espacement des barres change selon le mode. */
/* Histogramme : contrairement à un diagramme en barres classique, la LARGEUR de chaque
   rectangle doit respecter la largeur réelle de l'intervalle (les classes ne font pas
   forcément toutes la même largeur -- tailles, poids, âges...). Deux conventions possibles :
   - « à l'américaine » (useDensity=false) : la hauteur vaut l'effectif directement.
   - « à la française » (useDensity=true) : c'est l'AIRE du rectangle qui vaut l'effectif,
     donc hauteur = effectif ÷ largeur de la classe (densité) -- la convention rigoureuse dès
     que les classes n'ont pas toutes la même largeur. */
/* ---- Probabilités : sac/urne, cartes, arbre ---- */
function urnSvg(data, shape){
  const W=260,H=280,cx0=35,bandY=78,cw=190,bottomY=255;
  const clipId = 'urnClip'+(graphSvgIdCounter++);
  let balls = [];
  data.forEach(d=>{ for(let i=0;i<(d.count||0);i++) balls.push(d.color); });
  // Mélange déterministe (même rendu à chaque régénération), pour un aspect plus naturel qu'un
  // simple regroupement par couleur.
  balls = balls.map((c,i)=>({c,k:(i*2654435761)>>>0})).sort((a,b)=>(a.k%97)-(b.k%97)).map(o=>o.c);
  const n = balls.length || 1;
  // Zone intérieure (ellipse) où disperser librement les boules -- centre et rayons choisis
  // avec une marge confortable par rapport au contour réel, quelle que soit sa courbure. Plus
  // simple et plus naturel qu'un empilement en rangées (qui donnait des boules "posées en
  // équilibre" les unes sur les autres, peu réaliste).
  const ell = shape==='sac'
    ? {cx:cx0+cw/2, cy:(bandY+bottomY)/2+18, rx:cw/2-46, ry:(bottomY-bandY)/2-18}
    : {cx:cx0+cw/2, cy:(bandY+bottomY)/2+6, rx:cw/2-22, ry:(bottomY-bandY)/2-8};
  // Rayon des boules : on essaie le plus grand rayon raisonnable, puis on le réduit tant que
  // l'arrangement obtenu contient un chevauchement -- garantit qu'aucune boule ne touche jamais
  // une autre, quel que soit le nombre de boules à placer.
  const gap = 3; // espace minimal souhaité entre deux boules
  let r = Math.min(15, Math.sqrt((ell.rx*ell.ry*Math.PI*0.32)/n));
  let placed = [];
  while(r>=3.5){
    placed = [];
    let seed = 1234567;
    const rnd = () => { seed = (seed*1103515245+12345)>>>0; return (seed>>>8)/16777216; };
    let allOk = true;
    for(const color of balls){
      let best=null, bestScore=-1;
      for(let t=0;t<150;t++){
        const a = rnd()*Math.PI*2, dist = Math.sqrt(rnd());
        const px = ell.cx + Math.cos(a)*(ell.rx-r)*dist;
        const py = ell.cy + Math.sin(a)*(ell.ry-r)*dist;
        const minDist = placed.reduce((m,p)=>Math.min(m,Math.hypot(p.x-px,p.y-py)),Infinity);
        if(minDist > bestScore){ bestScore = minDist; best = {x:px,y:py}; }
        if(minDist >= r*2+gap) break;
      }
      if(bestScore < r*2+gap-0.01) allOk = false; // cette boule n'a trouvé aucune place sans chevauchement
      placed.push({x:best.x, y:best.y, color});
    }
    if(allOk) break;
    r -= 1;
  }
  let ballsHtml = placed.map(p=>{
    const bcx=p.x, bcy=p.y;
    // reflet clair en haut à gauche de chaque boule, pour un aspect brillant façon bille
    return `<circle cx="${bcx.toFixed(1)}" cy="${bcy.toFixed(1)}" r="${r.toFixed(1)}" fill="${p.color}" stroke="#1C1B2E" stroke-width="1.4"/>
      <ellipse cx="${(bcx-r*0.32).toFixed(1)}" cy="${(bcy-r*0.32).toFixed(1)}" rx="${(r*0.34).toFixed(1)}" ry="${(r*0.22).toFixed(1)}" fill="#fff" opacity="0.6" transform="rotate(-35 ${(bcx-r*0.32).toFixed(1)} ${(bcy-r*0.32).toFixed(1)})"/>`;
  }).join('');
  let outline, clipPath;
  if(shape==='sac'){
    // sommet ondulé (tissu resserré) : une série de petites bosses entre les deux épaules
    const nBumps=4, bumpW=(cw-30)/nBumps, topL=cx0+15, topR=cx0+cw-15;
    let scallop = `M${topL},${bandY-6}`;
    for(let i=0;i<nBumps;i++){
      const xm = topL+i*bumpW+bumpW/2, xe = topL+(i+1)*bumpW;
      const bump = i%2===0 ? -16 : -22;
      scallop += ` Q${xm},${bandY+bump} ${xe},${bandY-6}`;
    }
    outline = `<path d="M${cx0+22},${bandY+14} Q${cx0-18},${(bandY+bottomY)/2} ${cx0+cw*0.28},${bottomY} Q${cx0+cw*0.5},${bottomY+14} ${cx0+cw*0.72},${bottomY} Q${cx0+cw+18},${(bandY+bottomY)/2} ${cx0+cw-22},${bandY+14} Z" fill="none" stroke="#1C1B2E" stroke-width="2.2"/>
      <path d="${scallop}" fill="none" stroke="#1C1B2E" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M${cx0+18},${bandY-2} L${cx0+22},${bandY+22} L${cx0+cw-22},${bandY+22} L${cx0+cw-18},${bandY-2} Z" fill="#C9975A" stroke="#1C1B2E" stroke-width="2"/>`;
    clipPath = `M${cx0+18},${bandY+18} Q${cx0-20},${(bandY+bottomY)/2} ${cx0+cw*0.28},${bottomY+4} Q${cx0+cw*0.5},${bottomY+18} ${cx0+cw*0.72},${bottomY+4} Q${cx0+cw+20},${(bandY+bottomY)/2} ${cx0+cw-18},${bandY+18} Z`;
  } else {
    outline = `<path d="M${cx0+8},${bandY} L${cx0+18},${bottomY} Q${cx0+cw/2},${bottomY+14} ${cx0+cw-18},${bottomY} L${cx0+cw-8},${bandY} Z" fill="none" stroke="#1C1B2E" stroke-width="2.2"/>
      <ellipse cx="${cx0+cw/2}" cy="${bandY}" rx="${cw/2-8}" ry="9" fill="none" stroke="#1C1B2E" stroke-width="2.2"/>`;
    clipPath = `M${cx0+6},${bandY} L${cx0+18},${bottomY+2} Q${cx0+cw/2},${bottomY+16} ${cx0+cw-18},${bottomY+2} L${cx0+cw-6},${bandY} Z`;
  }
  const legend = data.filter(d=>d.count>0).map(d=>`<span style="display:inline-flex;align-items:center;gap:5px;margin:2px 10px 2px 0;"><span style="width:11px;height:11px;border-radius:50%;background:${d.color};display:inline-block;flex:none;"></span><span style="font-size:.85rem;">${escapeHtml(d.label||'')} : ${d.count}</span></span>`).join('');
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:260px;display:block;margin:6px auto;">
    <defs><clipPath id="${clipId}"><path d="${clipPath}"/></clipPath></defs>
    <g clip-path="url(#${clipId})">${ballsHtml}</g>
    ${outline}
  </svg>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;margin-top:4px;">${legend}</div>`;
}
const SUIT_SYMBOLS = {pique:'♠',coeur:'♥',carreau:'♦',trefle:'♣'};
const SUIT_COLORS = {pique:'#1C1B2E',coeur:'#D93025',carreau:'#D93025',trefle:'#1C1B2E'};
/* Dés : pour un dé à 6 faces, pastilles classiques (comme un vrai dé) ; pour les autres
   nombres de faces (4, 8, 10, 12, 20...), le nombre est simplement écrit au centre, une vraie
   forme polyédrique étant hors de portée d'un rendu SVG simple. */
function dicePipsHTML(v, x, y, size, pipColor){
  const positions = {
    1:[[.5,.5]], 2:[[.27,.27],[.73,.73]], 3:[[.27,.27],[.5,.5],[.73,.73]],
    4:[[.27,.27],[.73,.27],[.27,.73],[.73,.73]],
    5:[[.27,.27],[.73,.27],[.5,.5],[.27,.73],[.73,.73]],
    6:[[.27,.24],[.73,.24],[.27,.5],[.73,.5],[.27,.76],[.73,.76]],
  };
  return (positions[v]||[]).map(([px,py])=>`<circle cx="${(x+px*size).toFixed(1)}" cy="${(y+py*size).toFixed(1)}" r="${(size*0.09).toFixed(1)}" fill="${pipColor}"/>`).join('');
}
function diceSvg(dice){
  if(!dice.length) return '<p class="hint">Ajoute au moins un dé.</p>';
  const size=64, gap=14;
  const W = dice.length*(size+gap)-gap+16, H = size+24;
  let html='';
  dice.forEach((d,i)=>{
    const x=8+i*(size+gap), y=8;
    const bg = d.color||'#fff';
    const isDark = bg==='#1C1B2E' || bg==='#0D5BA3' || bg==='#D93025' || bg==='#1F7A4D' || bg==='#7B3FA0';
    const fg = isDark ? '#fff' : '#1C1B2E';
    html += `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="9" fill="${bg}" stroke="#1C1B2E" stroke-width="2"/>`;
    if(d.faces===6 && d.value>=1 && d.value<=6){
      html += dicePipsHTML(d.value, x, y, size, fg);
    } else {
      html += `<text x="${x+size/2}" y="${y+size/2+8}" font-size="24" text-anchor="middle" font-weight="700" font-family="Space Grotesk, sans-serif" fill="${fg}">${d.value}</text>`;
    }
    html += `<text x="${x+size/2}" y="${y+size+16}" font-size="10" text-anchor="middle" fill="#666" font-family="JetBrains Mono, monospace">d${d.faces}</text>`;
  });
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;display:block;margin:6px auto;">${html}</svg>`;
}
function cardsSvg(cards){
  if(!cards.length) return '<p class="hint">Sélectionne au moins une carte.</p>';
  const cw=50,ch=70,gap=7;
  const perRow = Math.min(cards.length, 8);
  const rows = Math.ceil(cards.length/perRow);
  const W = perRow*(cw+gap)-gap+16, H = rows*(ch+gap)-gap+16;
  let html='';
  cards.forEach((c,i)=>{
    const col=i%perRow, row=Math.floor(i/perRow);
    const x=8+col*(cw+gap), y=8+row*(ch+gap);
    const color = SUIT_COLORS[c.suit], symbol = SUIT_SYMBOLS[c.suit];
    html += `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="6" fill="#fff" stroke="#1C1B2E" stroke-width="1.4"/>
      <text x="${x+6}" y="${y+18}" font-size="14" font-weight="700" fill="${color}" font-family="Space Grotesk, sans-serif">${c.rank}</text>
      <text x="${x+6}" y="${y+34}" font-size="16" fill="${color}">${symbol}</text>
      <text x="${x+cw-6}" y="${y+ch-8}" font-size="14" font-weight="700" fill="${color}" text-anchor="end" font-family="Space Grotesk, sans-serif" transform="rotate(180 ${x+cw-6} ${y+ch-8})">${c.rank}</text>`;
  });
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;display:block;margin:6px auto;">${html}</svg>`;
}
/* Arbre de probabilité : calcule d'abord la position verticale de chaque noeud (les feuilles se
   répartissent également, un noeud parent se centre sur ses enfants), puis relie chaque parent
   à ses enfants par un trait, avec l'événement et sa probabilité comme étiquettes. */
function treeLayout(node, yTop, yBottom){
  if(!node.children || !node.children.length) return {node, y:(yTop+yBottom)/2, children:[]};
  const n = node.children.length, slot=(yBottom-yTop)/n;
  const kids = node.children.map((c,i)=>treeLayout(c, yTop+i*slot, yTop+(i+1)*slot));
  return {node, y:kids.reduce((s,k)=>s+k.y,0)/kids.length, children:kids};
}
/* Insère du texte "riche" (LaTeX entre $...$, ou texte simple) dans le SVG via foreignObject --
   nécessaire pour écrire correctement des notations comme $\overline{A}$ ou $P(B \mid A)$,
   impossible avec un simple <text> SVG. */
function svgRichText(x, y, text, opts){
  opts = opts||{};
  const w = opts.width||100, h = opts.height||22;
  let ox = x;
  const align = opts.anchor==='end' ? 'right' : opts.anchor==='middle' ? 'center' : 'left';
  if(opts.anchor==='middle') ox = x-w/2; else if(opts.anchor==='end') ox = x-w;
  return `<foreignObject x="${ox.toFixed(1)}" y="${(y-h+5).toFixed(1)}" width="${w}" height="${h}" style="overflow:visible;">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:12px;text-align:${align};color:${opts.color||'#1C1B2E'};font-weight:${opts.bold?700:400};font-family:'Space Grotesk',sans-serif;white-space:nowrap;line-height:1.3;">${renderMathText(text||'')}</div>
  </foreignObject>`;
}
function treeSvg(root){
  const maxDepth = (n,d)=>!n.children||!n.children.length ? d : Math.max(...n.children.map(c=>maxDepth(c,d+1)));
  const depth = maxDepth(root,0) || 1;
  const dx = 140, padL=70, padTB=24;
  const nLeaves = (n)=>!n.children||!n.children.length?1:n.children.reduce((s,c)=>s+nLeaves(c),0);
  const H = Math.max(nLeaves(root)*50, 80)+padTB*2;
  const W = padL + depth*dx + 140;
  const layout = treeLayout(root, padTB, H-padTB);
  let lines='', labels='', nodes='';
  function walk(l, x, isRoot){
    nodes += `<circle cx="${x}" cy="${l.y.toFixed(1)}" r="4" fill="#1C1B2E"/>`;
    if(isRoot && l.node.label) labels += svgRichText(x-8, l.y-9, l.node.label, {anchor:'end', bold:true});
    const isLeaf = !l.children.length;
    if(isLeaf && !isRoot && l.node.note) labels += svgRichText(x+16, l.y+5, l.node.note, {anchor:'start', width:120, color:'#1F7A4D'});
    l.children.forEach(child=>{
      const x2 = x+dx;
      lines += `<line x1="${x}" y1="${l.y.toFixed(1)}" x2="${x2}" y2="${child.y.toFixed(1)}" stroke="#1C1B2E" stroke-width="1.6"/>`;
      const midx=(x+x2)/2, midy=(l.y+child.y)/2;
      const goingUp = child.y < l.y - 1;
      // Dégagement plus généreux côté montant : une fraction \dfrac (numérateur + barre +
      // dénominateur) est nettement plus haute qu'une simple ligne de texte, le dénominateur
      // était coupé par le trait faute de marge suffisante.
      const probaY = goingUp ? midy-16 : midy+26;
      if(child.node.proba) labels += svgRichText(midx, probaY, child.node.proba, {anchor:'middle', width:80, color:'#0D5BA3', height:30});
      const labelY = goingUp ? child.y-9 : child.y+22;
      labels += svgRichText(x2+8, labelY, child.node.label||'', {anchor:'start', width:100, bold:true});
      walk(child, x2, false);
    });
  }
  walk(layout, padL, true);
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;display:block;margin:6px auto;">${lines}${nodes}${labels}</svg>`;
}
function histogramSvg(data, useDensity){
  const W=420,H=300,padL=45,padB=36,padT=14,padR=14;
  const plotW=W-padL-padR, plotH=H-padT-padB;
  const classes = data.filter(d=>d.classMin!=null && d.classMax!=null && d.classMax>d.classMin);
  if(!classes.length) return '<p class="hint">Renseigne au moins une classe valide (borne supérieure > borne inférieure).</p>';
  const xMin = Math.min(...classes.map(d=>d.classMin));
  const xMax = Math.max(...classes.map(d=>d.classMax));
  const X = v => padL + (xMax>xMin ? (v-xMin)/(xMax-xMin) : 0)*plotW;
  const heights = classes.map(d=>{
    const w = d.classMax-d.classMin;
    return useDensity ? (d.value||0)/w : (d.value||0);
  });
  const maxH = Math.max(...heights, 1e-9);
  const yStep = niceStep(maxH);
  const yTop = Math.ceil(maxH/yStep)*yStep || yStep;
  let grid='', yLabels='', bars='';
  for(let v=0; v<=yTop+1e-9; v+=yStep){
    const y = padT+plotH-(v/yTop)*plotH;
    grid += `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W-padR}" y2="${y.toFixed(1)}" stroke="rgba(28,43,57,.1)"/>`;
    yLabels += `<text x="${padL-6}" y="${(y+4).toFixed(1)}" font-size="11" text-anchor="end" font-family="JetBrains Mono, monospace">${frDecimal(Math.round(v*1000)/1000)}</text>`;
  }
  classes.forEach((d,i)=>{
    const color = d.color || GRAPH_COLORS[i%GRAPH_COLORS.length];
    const x1 = X(d.classMin), x2 = X(d.classMax);
    const bh = (heights[i]/yTop)*plotH;
    const y = padT+plotH-bh;
    bars += `<rect x="${x1.toFixed(1)}" y="${y.toFixed(1)}" width="${(x2-x1).toFixed(1)}" height="${bh.toFixed(1)}" fill="${color}" stroke="#fff" stroke-width="1"/>`;
  });
  const boundaries = [...new Set(classes.flatMap(d=>[d.classMin,d.classMax]))].sort((a,b)=>a-b);
  const xLabels = boundaries.map(v=>`<text x="${X(v).toFixed(1)}" y="${(padT+plotH+16).toFixed(1)}" font-size="10" text-anchor="middle" font-family="JetBrains Mono, monospace">${frDecimal(v)}</text>`).join('');
  const axes = `<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT+plotH}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${padL}" y1="${padT+plotH}" x2="${W-padR}" y2="${padT+plotH}" stroke="#1C1B2E" stroke-width="1.6"/>`;
  const axisNote = `<text x="${W-padR}" y="${padT-2}" font-size="9" text-anchor="end" fill="#666" font-family="JetBrains Mono, monospace">${useDensity?'densité (aire = effectif)':'hauteur = effectif'}</text>`;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:420px;display:block;margin:6px auto;">
    ${grid}${axes}${bars}${yLabels}${xLabels}${axisNote}
  </svg>`;
}
function barLikeChartSvg(data, mode){
  const W=420,H=300,padL=42,padB=36,padT=14,padR=14;
  const plotW=W-padL-padR, plotH=H-padT-padB;
  const maxV = Math.max(...data.map(d=>d.value||0), 1);
  const n = data.length || 1;
  const yStep = niceStep(maxV);
  const yTop = Math.ceil(maxV/yStep)*yStep;
  let grid='', yLabels='';
  for(let v=0; v<=yTop+1e-9; v+=yStep){
    const y = padT+plotH-(v/yTop)*plotH;
    grid += `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W-padR}" y2="${y.toFixed(1)}" stroke="rgba(28,43,57,.1)"/>`;
    yLabels += `<text x="${padL-6}" y="${(y+4).toFixed(1)}" font-size="11" text-anchor="end" font-family="JetBrains Mono, monospace">${frDecimal(Math.round(v*100)/100)}</text>`;
  }
  const slot = plotW/n;
  // bâtons : trait fin + point ; histogramme : barres jointives ; barres : espacées
  const barW = mode==='batons' ? 0 : mode==='histogramme' ? slot : slot*0.62;
  let bars='', xLabels='';
  data.forEach((d,i)=>{
    const v = d.value||0;
    const color = d.color || GRAPH_COLORS[i%GRAPH_COLORS.length];
    const bh = (v/yTop)*plotH;
    const xCenter = padL + i*slot + slot/2;
    const y = padT+plotH-bh;
    if(mode==='batons'){
      bars += `<line x1="${xCenter.toFixed(1)}" y1="${(padT+plotH).toFixed(1)}" x2="${xCenter.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${color}" stroke-width="2.4"/>
        <circle cx="${xCenter.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${color}"/>`;
    } else {
      const x = xCenter - barW/2;
      bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" fill="${color}" stroke="${mode==='histogramme'?'#fff':'none'}" stroke-width="${mode==='histogramme'?1:0}"/>`;
    }
    xLabels += `<text x="${xCenter.toFixed(1)}" y="${(padT+plotH+16).toFixed(1)}" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">${escapeHtml(d.label||'')}</text>`;
  });
  const axes = `<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT+plotH}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${padL}" y1="${padT+plotH}" x2="${W-padR}" y2="${padT+plotH}" stroke="#1C1B2E" stroke-width="1.6"/>`;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:420px;display:block;margin:6px auto;">
    ${grid}${axes}${bars}${yLabels}${xLabels}
  </svg>`;
}

function graphSvg(xMin,xMax,yMin,yMax,curves,xUnitPi,labelStepX,labelStepY){
  labelStepX = labelStepX && labelStepX>=1 ? Math.round(labelStepX) : 1;
  labelStepY = labelStepY && labelStepY>=1 ? Math.round(labelStepY) : 1;
  const W=420,H=340,pad=30;
  const clipId = 'gClip'+(graphSvgIdCounter++);
  const sx = (W-2*pad)/(xMax-xMin), sy=(H-2*pad)/(yMax-yMin);
  const X = v => pad + (v-xMin)*sx;
  const Y = v => H-pad-(v-yMin)*sy;
  const showOrigin = xMin<=0 && xMax>=0 && yMin<=0 && yMax>=0;
  const xAxisY = Y(Math.max(yMin, Math.min(yMax, 0))); // position de l'axe des x (clampée si 0 hors champ)
  const yAxisX = X(Math.max(xMin, Math.min(xMax, 0)));
  /* Réécrit une valeur en fraction de π (π/2, π, 3π/2...) pour l'axe des x en mode radians --
     pédagogiquement indispensable pour les fonctions trigonométriques. */
  /* Écrit une valeur en fraction de π (π/2, π, 3π/2...) pour l'axe des x en mode radians --
     pédagogiquement indispensable pour les fonctions trigonométriques. Les demis sont dessinés
     comme une vraie fraction empilée (numérateur / barre / dénominateur), pas un texte plat
     "π/2", pour rester fidèle à l'écriture mathématique habituelle. */
  function piLabelSvg(v, cx, cy){
    const n = Math.round(v/(Math.PI/2));
    if(n===0) return `<text x="${cx}" y="${cy}" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">0</text>`;
    const sign = n<0 ? '-' : '';
    const a = Math.abs(n);
    if(a%2===0){
      const k=a/2;
      const label = sign+(k===1?'π':k+'π');
      return `<text x="${cx}" y="${cy}" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">${label}</text>`;
    }
    const numText = sign+(a===1?'π':a+'π');
    return `<text x="${cx}" y="${cy-8}" font-size="10" text-anchor="middle" font-family="JetBrains Mono, monospace">${numText}</text>
      <line x1="${cx-9}" y1="${cy-3}" x2="${cx+9}" y2="${cy-3}" stroke="#1C1B2E" stroke-width="1"/>
      <text x="${cx}" y="${cy+8}" font-size="10" text-anchor="middle" font-family="JetBrains Mono, monospace">2</text>`;
  }
  let grid='', xLabels='', yLabels='';
  const xStep = xUnitPi ? Math.PI/2 : 1;
  const xStart = xUnitPi ? Math.ceil(xMin/xStep)*xStep : Math.ceil(xMin);
  let xi = Math.round(xStart/xStep);
  for(let v=xStart; v<=xMax+1e-9; v+=xStep, xi++){
    const rv = Math.round(v*1000)/1000;
    grid += `<line x1="${X(rv)}" y1="${pad}" x2="${X(rv)}" y2="${H-pad}" stroke="rgba(28,43,57,.1)" stroke-width="1"/>`;
    if(Math.abs(rv)>1e-6 && xi%labelStepX===0){
      xLabels += xUnitPi ? piLabelSvg(rv, X(rv), xAxisY+16) : `<text x="${X(rv)}" y="${xAxisY+15}" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">${frDecimal(rv)}</text>`;
    }
  }
  for(let v=Math.ceil(yMin); v<=yMax; v++){
    grid += `<line x1="${pad}" y1="${Y(v)}" x2="${W-pad}" y2="${Y(v)}" stroke="rgba(28,43,57,.1)" stroke-width="1"/>`;
    if(v!==0 && v%labelStepY===0) yLabels += `<text x="${yAxisX-6}" y="${Y(v)+4}" font-size="11" text-anchor="end" font-family="JetBrains Mono, monospace">${frDecimal(v)}</text>`;
  }
  const axes = `<line x1="${pad-10}" y1="${xAxisY}" x2="${W-pad+10}" y2="${xAxisY}" stroke="#1C1B2E" stroke-width="1.6" marker-end="url(#gAxeArrowX)"/>
    <line x1="${yAxisX}" y1="${H-pad+10}" x2="${yAxisX}" y2="${pad-10}" stroke="#1C1B2E" stroke-width="1.6" marker-end="url(#gAxeArrowY)"/>`;
  const originLabel = showOrigin ? `<text x="${X(0)-12}" y="${Y(0)+18}" font-size="13" font-weight="700" font-family="Space Grotesk, sans-serif">O</text>` : '';
  let curvesHtml = '';
  curves.forEach((c,i)=>{
    const color = c.color || GRAPH_COLORS[i%GRAPH_COLORS.length];
    if(c.type==='droite'){
      const {x1,y1,x2,y2} = c;
      if(x2===x1){
        curvesHtml += `<line x1="${X(x1)}" y1="${pad}" x2="${X(x1)}" y2="${H-pad}" stroke="${color}" stroke-width="2.2"/>`;
      } else {
        const m = (y2-y1)/(x2-x1), b = y1-m*x1;
        curvesHtml += `<line x1="${X(xMin)}" y1="${Y(m*xMin+b)}" x2="${X(xMax)}" y2="${Y(m*xMax+b)}" stroke="${color}" stroke-width="2.2"/>`;
      }
      curvesHtml += `<circle cx="${X(x1)}" cy="${Y(y1)}" r="3.2" fill="${color}"/><circle cx="${X(x2)}" cy="${Y(y2)}" r="3.2" fill="${color}"/>`;
    } else if(c.type==='fonction'){
      let d='', started=false;
      // 400 points (au lieu de 240) pour que le tracé s'arrête net, au plus près du bord réel,
      // sans le forcer à plat (aucune tolérance de dépassement : dès qu'un point calculé sort
      // de la zone visible, le tracé s'interrompt à cet endroit précis -- comportement naturel
      // d'une calculatrice graphique, plutôt qu'un plafonnement qui créait des lignes plates
      // disgracieuses en haut/bas du cadre).
      const steps = 400;
      for(let k=0;k<=steps;k++){
        const xv = xMin + (xMax-xMin)*k/steps;
        const yv = evalFunctionExpr(c.expr, xv);
        if(isNaN(yv) || yv<yMin || yv>yMax){ started=false; continue; }
        d += (started?'L':'M')+X(xv).toFixed(1)+','+Y(yv).toFixed(1)+' ';
        started = true;
      }
      curvesHtml += `<path d="${d}" fill="none" stroke="${color}" stroke-width="2.2"/>`;
    }
  });
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:420px;height:auto;display:block;margin:6px auto;">
    <defs>
      <marker id="gAxeArrowX" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#1C1B2E"/></marker>
      <marker id="gAxeArrowY" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#1C1B2E"/></marker>
      <clipPath id="${clipId}"><rect x="0" y="0" width="${W}" height="${H}"/></clipPath>
    </defs>
    <g clip-path="url(#${clipId})">
      ${grid}${axes}${originLabel}${xLabels}${yLabels}${curvesHtml}
    </g>
  </svg>`;
}

function cubeStackSvg(cubes, selectedIdx, interactive){
  const S = 46, k = 0.5, theta = Math.PI/4;
  const dx = Math.cos(theta)*k*S, dy = Math.sin(theta)*k*S;
  const proj = (x,y,z) => ({ sx: x*S + z*dx, sy: -y*S - z*dy });
  // tri peintre : les cubes les plus au fond (z grand) sont dessinés en premier, les plus
  // proches en dernier, pour qu'ils recouvrent correctement ceux derrière eux.
  const order = cubes.map((c,i)=>i).sort((ia,ib)=>{
    const a=cubes[ia], b=cubes[ib];
    return (b.z-a.z) || (a.y-b.y) || (a.x-b.x);
  });
  const pts = arr => arr.map(p=>`${p.sx.toFixed(1)},${p.sy.toFixed(1)}`).join(' ');
  let shapes = '';
  let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
  order.forEach(i=>{
    const c = cubes[i];
    const isSel = interactive && i===selectedIdx;
    const p000=proj(c.x,c.y,c.z), p100=proj(c.x+1,c.y,c.z), p010=proj(c.x,c.y+1,c.z), p110=proj(c.x+1,c.y+1,c.z);
    const p001=proj(c.x,c.y,c.z+1), p101=proj(c.x+1,c.y,c.z+1), p011=proj(c.x,c.y+1,c.z+1), p111=proj(c.x+1,c.y+1,c.z+1);
    [p000,p100,p010,p110,p001,p101,p011,p111].forEach(p=>{ minX=Math.min(minX,p.sx); maxX=Math.max(maxX,p.sx); minY=Math.min(minY,p.sy); maxY=Math.max(maxY,p.sy); });
    const stroke = isSel ? '#0D5BA3' : '#1C1B2E';
    const sw = isSel ? 2.6 : 1.4;
    const click = interactive ? ` onclick="selectCube(${i})" style="cursor:pointer;"` : '';
    shapes += `<polygon points="${pts([p000,p100,p110,p010])}" fill="#FFB067" stroke="${stroke}" stroke-width="${sw}"${click}/>`;
    shapes += `<polygon points="${pts([p010,p110,p111,p011])}" fill="#FFDCAE" stroke="${stroke}" stroke-width="${sw}"${click}/>`;
    shapes += `<polygon points="${pts([p100,p101,p111,p110])}" fill="#E07C1E" stroke="${stroke}" stroke-width="${sw}"${click}/>`;
  });
  const pad = 12;
  const W = (maxX-minX)+pad*2, H = (maxY-minY)+pad*2;
  const offX = pad-minX, offY = pad-minY;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:340px;height:auto;display:block;margin:6px auto;">
    <g transform="translate(${offX},${offY})">${shapes}</g>
  </svg>`;
}

function buildRectFracSvg(num,den,vertical,vierge,showCaption,reponseSimple,reponseMixte,gridRows,gridCols,customSet,interactive,showMixte){
  const isGrid = gridRows>1 && gridCols>1;
  const effectiveDen = isGrid ? gridRows*gridCols : den;
  const nShapes = Math.max(1, Math.ceil(num/effectiveDen));
  let rects = '';
  for(let i=0;i<nShapes;i++){
    // Le dessin interactif (clic pour colorier/décolorier une case précise) n'a de sens que
    // pour une fraction propre, dessinée en une seule forme -- au-delà, on revient au
    // remplissage séquentiel habituel (moins fréquent en pratique pour ce type d'exercice).
    let filledSet;
    if(customSet && nShapes===1 && !vierge){
      filledSet = customSet;
    } else {
      const filled = vierge ? 0 : Math.max(0, Math.min(effectiveDen, num - i*effectiveDen));
      filledSet = new Set(Array.from({length:filled}, (_,k)=>k));
    }
    const svg = isGrid ? singleRectGridSvg(filledSet, gridRows, gridCols, interactive && nShapes===1) : singleRectFracSvg(filledSet, den, vertical, interactive && nShapes===1);
    rects += `<div style="flex:1 1 0;max-width:180px;min-width:60px;">${svg}</div>`;
  }
  const displayNum = (customSet && nShapes===1 && !vierge) ? customSet.size : num;
  const fracKatex = katexSpan(`\\dfrac{${displayNum}}{${effectiveDen}}`);
  const caption = vierge ? `Colorie ${katexSpan(`\\dfrac{${num}}{${effectiveDen}}`)} du rectangle` : buildFractionCaptionWithMixte(fracKatex, displayNum, effectiveDen, showMixte);
  return `<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;max-width:${nShapes*180+((nShapes-1)*10)}px;margin:0 auto;">${rects}</div>
    ${showCaption!==false ? `<p class="hint" style="text-align:center;margin:4px 0 0;">${caption}</p>` : ''}
    ${fractionAnswerHTML(reponseSimple, reponseMixte)}`;
}
/* Motif de cases colorées choisi à la main par clic (indices), pour l'outil rectangle en cours
   de construction. Retombe sur un remplissage séquentiel simple dès qu'on retape un nombre
   dans "Parts colorées", ou qu'on change le découpage (dénominateur, lignes/colonnes, sens). */
let rectFracCustomSet = new Set([0,1,2]);
function syncRectFracCustomSetFromNum(){
  const num = parseInt(document.getElementById('rectFracNum').value)||0;
  rectFracCustomSet = new Set(Array.from({length:num}, (_,k)=>k));
}
function toggleRectFracCell(idx){
  if(rectFracCustomSet.has(idx)) rectFracCustomSet.delete(idx); else rectFracCustomSet.add(idx);
  document.getElementById('rectFracNum').value = rectFracCustomSet.size;
  previewRectFrac();
}
function toggleRectFracGrid(){
  const on = document.getElementById('rectFracGrid').checked;
  document.getElementById('rectFracGridRow').style.display = on ? 'inline' : 'none';
  document.getElementById('rectFracDenRow').style.display = on ? 'none' : 'inline';
  document.getElementById('rectFracVert').closest('label').style.display = on ? 'none' : 'inline-flex';
  syncRectFracCustomSetFromNum();
}
function previewRectFrac(){
  const num=parseInt(document.getElementById('rectFracNum').value), den=parseInt(document.getElementById('rectFracDen').value);
  const vert = document.getElementById('rectFracVert').checked;
  const vierge = document.getElementById('rectFracVierge').checked;
  const showCaption = document.getElementById('rectFracShowCaption').checked;
  const showMixte = document.getElementById('rectFracShowMixte').checked;
  const reponseSimple = document.getElementById('rectFracReponseSimple').checked;
  const reponseMixte = document.getElementById('rectFracReponseMixte').checked;
  const isGrid = document.getElementById('rectFracGrid').checked;
  const rows = isGrid ? parseInt(document.getElementById('rectFracRows').value)||2 : null;
  const cols = isGrid ? parseInt(document.getElementById('rectFracCols').value)||2 : null;
  document.getElementById('rectFracPreview').innerHTML = (isGrid || (den>0&&num>=0)) ? buildRectFracSvg(num,den,vert,vierge,showCaption,reponseSimple,reponseMixte,rows,cols,rectFracCustomSet,true,showMixte) : '';
}
function openRectFracTool(){activateToolTab('shapeGroupWrap','shapeTabRect','shapeTabDisque'); document.getElementById('toolsModalOverlay').style.display='flex'; document.getElementById('rectFracPanel').style.display='block'; document.getElementById('rectFracPreview').innerHTML=''; document.getElementById('rectFracPanel').scrollIntoView({behavior:'smooth',block:'nearest'}); }
function closeRectFracTool(){document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('rectFracPanel').style.display='none'; }
function insertRectFrac(){
  const num=parseInt(document.getElementById('rectFracNum').value), den=parseInt(document.getElementById('rectFracDen').value);
  const vert = document.getElementById('rectFracVert').checked;
  const vierge = document.getElementById('rectFracVierge').checked;
  const showCaption = document.getElementById('rectFracShowCaption').checked;
  const showMixte = document.getElementById('rectFracShowMixte').checked;
  const reponseSimple = document.getElementById('rectFracReponseSimple').checked;
  const reponseMixte = document.getElementById('rectFracReponseMixte').checked;
  const isGrid = document.getElementById('rectFracGrid').checked;
  const rows = isGrid ? parseInt(document.getElementById('rectFracRows').value)||2 : null;
  const cols = isGrid ? parseInt(document.getElementById('rectFracCols').value)||2 : null;
  if(!isGrid && !(den>0&&num>=0)) return;
  const customArr = Array.from(rectFracCustomSet);
  addPendingBlock('rectFrac', buildRectFracSvg(num,den,vert,vierge,showCaption,reponseSimple,reponseMixte,rows,cols,rectFracCustomSet,false,showMixte), {num,den,vert,vierge,showCaption,reponseSimple,reponseMixte,rows,cols,customArr,showMixte}, 'reopenRectFrac');
  closeRectFracTool();
}
function reopenRectFrac(data){
  openRectFracTool();
  document.getElementById('rectFracNum').value = data.num;
  document.getElementById('rectFracDen').value = data.den;
  document.getElementById('rectFracVert').checked = data.vert;
  document.getElementById('rectFracVierge').checked = !!data.vierge;
  document.getElementById('rectFracShowCaption').checked = data.showCaption!==false;
  document.getElementById('rectFracShowMixte').checked = !!data.showMixte;
  document.getElementById('rectFracReponseSimple').checked = !!data.reponseSimple;
  document.getElementById('rectFracReponseMixte').checked = !!data.reponseMixte;
  document.getElementById('rectFracGrid').checked = !!(data.rows && data.cols);
  if(data.rows) document.getElementById('rectFracRows').value = data.rows;
  if(data.cols) document.getElementById('rectFracCols').value = data.cols;
  toggleRectFracGrid();
  rectFracCustomSet = new Set(data.customArr && data.customArr.length ? data.customArr : Array.from({length:data.num||0}, (_,k)=>k));
  previewRectFrac();
}


/* ---- Outil Cubes empilés (perspective cavalière) ---- */
let cubesState = [{x:0,y:0,z:0},{x:1,y:0,z:0}];
let cubesSelected = 0;
function openCubesTool(){
  hideAllToolContent();
  document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('cubesPanel').style.display='block';
  cubesState = [{x:0,y:0,z:0},{x:1,y:0,z:0}];
  cubesSelected = 0;
  previewCubes();
  document.getElementById('cubesPanel').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function closeCubesTool(){ document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('cubesPanel').style.display='none'; }
function previewCubes(){
  document.getElementById('cubesPreview').innerHTML = cubeStackSvg(cubesState, cubesSelected, true);
}
function selectCube(i){ cubesSelected = i; previewCubes(); }
function addCube(){
  // Place le nouveau cube juste à côté du cube sélectionné (case vide la plus proche), pour
  // qu'il apparaisse toujours visible plutôt que superposé à un autre.
  const base = cubesState[cubesSelected] || {x:0,y:0,z:0};
  const candidates = [{x:base.x+1,y:base.y,z:base.z},{x:base.x-1,y:base.y,z:base.z},{x:base.x,y:base.y,z:base.z+1},{x:base.x,y:base.y+1,z:base.z}];
  const occupied = c => cubesState.some(k=>k.x===c.x&&k.y===c.y&&k.z===c.z);
  const spot = candidates.find(c=>!occupied(c)) || {x:base.x, y:base.y+cubesState.length, z:base.z};
  cubesState.push(spot);
  cubesSelected = cubesState.length-1;
  previewCubes();
}
function removeCube(){
  if(cubesState.length<=1) return; // toujours au moins un cube
  cubesState.splice(cubesSelected,1);
  cubesSelected = Math.max(0, cubesSelected-1);
  previewCubes();
}
function moveCube(dx,dy,dz){
  if(!cubesState[cubesSelected]) return;
  const c = cubesState[cubesSelected];
  const next = {x:c.x+dx, y:c.y+dy, z:c.z+dz};
  if(next.y<0) return; // ne descend pas sous le sol
  if(cubesState.some((k,i)=>i!==cubesSelected && k.x===next.x && k.y===next.y && k.z===next.z)) return; // case déjà occupée
  cubesState[cubesSelected] = next;
  previewCubes();
}
function insertCubeStack(){
  const html = cubeStackSvg(cubesState, cubesSelected, false);
  addPendingBlock('cubes', html, {cubes: JSON.parse(JSON.stringify(cubesState))}, 'reopenCubes');
  closeCubesTool();
}
function reopenCubes(data){
  openCubesTool();
  cubesState = JSON.parse(JSON.stringify(data.cubes||[{x:0,y:0,z:0},{x:1,y:0,z:0}]));
  cubesSelected = 0;
  previewCubes();
}

/* ---- Outil Graphique (droites et fonctions) ---- */
let graphCurves = [];
let graphNextId = 1;
function openGraphTool(){
  hideAllToolContent();
  document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('graphPanel').style.display='block';
  document.getElementById('graphXPi').checked = false;
  document.getElementById('graphXMin').value = -5;
  document.getElementById('graphXMax').value = 5;
  document.getElementById('graphLabelStepX').value = 1;
  document.getElementById('graphLabelStepY').value = 1;
  graphCurves = [{id:graphNextId++, type:'fonction', expr:'x^2-3'}];
  renderGraphCurvesList();
  document.getElementById('graphPanel').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function closeGraphTool(){ document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('graphPanel').style.display='none'; }
function addGraphCurve(type){
  graphCurves.push(type==='droite' ? {id:graphNextId++, type:'droite', x1:0,y1:0,x2:1,y2:1} : {id:graphNextId++, type:'fonction', expr:'x'});
  renderGraphCurvesList();
}
function removeGraphCurve(id){
  graphCurves = graphCurves.filter(c=>c.id!==id);
  renderGraphCurvesList();
}
function updateGraphCurve(id, field, value){
  const c = graphCurves.find(c=>c.id===id);
  if(c) c[field] = (field==='expr') ? value : parseFloat(value);
  previewGraph();
}
function renderGraphCurvesList(){
  const box = document.getElementById('graphCurvesList');
  box.innerHTML = graphCurves.map((c,i)=>{
    const color = GRAPH_COLORS[i%GRAPH_COLORS.length];
    const swatch = `<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${color};margin-right:6px;"></span>`;
    if(c.type==='droite'){
      return `<div class="tool-row" style="margin-bottom:6px;align-items:center;">
        ${swatch}<span class="hint" style="margin:0;">Droite :</span>
        <label class="hint" style="margin:0;">A(<input type="number" value="${c.x1}" oninput="updateGraphCurve(${c.id},'x1',this.value)" style="width:50px;"> ;
        <input type="number" value="${c.y1}" oninput="updateGraphCurve(${c.id},'y1',this.value)" style="width:50px;">)</label>
        <label class="hint" style="margin:0;">B(<input type="number" value="${c.x2}" oninput="updateGraphCurve(${c.id},'x2',this.value)" style="width:50px;"> ;
        <input type="number" value="${c.y2}" oninput="updateGraphCurve(${c.id},'y2',this.value)" style="width:50px;">)</label>
        <button type="button" onclick="removeGraphCurve(${c.id})" style="border:none;background:rgba(217,48,37,.1);color:#D93025;border-radius:6px;padding:3px 8px;cursor:pointer;"><span class=gicon>close</span></button>
      </div>`;
    }
    return `<div class="tool-row" style="margin-bottom:6px;align-items:center;">
      ${swatch}<span class="hint" style="margin:0;">f(x) =</span>
      <input type="text" value="${escapeHtml(c.expr)}" oninput="updateGraphCurve(${c.id},'expr',this.value)" style="width:160px;">
      <button type="button" onclick="removeGraphCurve(${c.id})" style="border:none;background:rgba(217,48,37,.1);color:#D93025;border-radius:6px;padding:3px 8px;cursor:pointer;"><span class=gicon>close</span></button>
    </div>`;
  }).join('');
  previewGraph();
}
function previewGraph(){
  const xPi = document.getElementById('graphXPi').checked;
  const labelStepX = parseInt(document.getElementById('graphLabelStepX').value)||1;
  const labelStepY = parseInt(document.getElementById('graphLabelStepY').value)||1;
  let xMin=parseFloat(document.getElementById('graphXMin').value), xMax=parseFloat(document.getElementById('graphXMax').value);
  const yMin=parseFloat(document.getElementById('graphYMin').value), yMax=parseFloat(document.getElementById('graphYMax').value);
  if(xPi){ xMin*=Math.PI; xMax*=Math.PI; }
  document.getElementById('graphPreview').innerHTML = (xMax>xMin && yMax>yMin) ? graphSvg(xMin,xMax,yMin,yMax,graphCurves,xPi,labelStepX,labelStepY) : '<p class="hint" style="color:var(--accent-orange);">Les maximums doivent être supérieurs aux minimums.</p>';
}
function insertGraph(){
  const xPi = document.getElementById('graphXPi').checked;
  const labelStepX = parseInt(document.getElementById('graphLabelStepX').value)||1;
  const labelStepY = parseInt(document.getElementById('graphLabelStepY').value)||1;
  let xMin=parseFloat(document.getElementById('graphXMin').value), xMax=parseFloat(document.getElementById('graphXMax').value);
  const yMin=parseFloat(document.getElementById('graphYMin').value), yMax=parseFloat(document.getElementById('graphYMax').value);
  if(xPi){ xMin*=Math.PI; xMax*=Math.PI; }
  if(!(xMax>xMin && yMax>yMin) || !graphCurves.length) return;
  addPendingBlock('graph', graphSvg(xMin,xMax,yMin,yMax,graphCurves,xPi,labelStepX,labelStepY), {xMin,xMax,yMin,yMax,xPi,labelStepX,labelStepY,curves:JSON.parse(JSON.stringify(graphCurves))}, 'reopenGraph');
  closeGraphTool();
}
function reopenGraph(data){
  openGraphTool();
  document.getElementById('graphXPi').checked = !!data.xPi;
  document.getElementById('graphXMin').value = data.xPi ? data.xMin/Math.PI : data.xMin;
  document.getElementById('graphXMax').value = data.xPi ? data.xMax/Math.PI : data.xMax;
  document.getElementById('graphYMin').value = data.yMin;
  document.getElementById('graphYMax').value = data.yMax;
  document.getElementById('graphLabelStepX').value = data.labelStepX||1;
  document.getElementById('graphLabelStepY').value = data.labelStepY||1;
  graphCurves = JSON.parse(JSON.stringify(data.curves||[]));
  graphNextId = Math.max(1, ...graphCurves.map(c=>c.id+1));
  renderGraphCurvesList();
}
/* Ajuste automatiquement les bornes pour bien cadrer les courbes tracées : Y d'après les
   valeurs réellement atteintes (échantillonnage des fonctions, points des droites), X d'après
   les points des droites s'il y en a (les fonctions n'ont pas de « bonne » plage naturelle). */
function autoFitGraph(){
  const xPi = document.getElementById('graphXPi').checked;
  let xMin=parseFloat(document.getElementById('graphXMin').value), xMax=parseFloat(document.getElementById('graphXMax').value);
  if(xPi){ xMin*=Math.PI; xMax*=Math.PI; }
  if(!(xMax>xMin) || !graphCurves.length) return;
  let yValues = [], xValues = [];
  graphCurves.forEach(c=>{
    if(c.type==='droite'){ xValues.push(c.x1,c.x2); yValues.push(c.y1,c.y2); }
    else if(c.type==='fonction'){
      for(let k=0;k<=150;k++){
        const xv = xMin + (xMax-xMin)*k/150;
        const yv = evalFunctionExpr(c.expr, xv);
        if(!isNaN(yv) && isFinite(yv)) yValues.push(yv);
      }
    }
  });
  if(!yValues.length) return;
  let yLo = Math.min(...yValues), yHi = Math.max(...yValues);
  const yPad = (yHi-yLo)*0.15 || 1;
  document.getElementById('graphYMin').value = Math.floor(yLo-yPad);
  document.getElementById('graphYMax').value = Math.ceil(yHi+yPad);
  if(xValues.length){
    let xLo = Math.min(...xValues), xHi = Math.max(...xValues);
    const xPad = (xHi-xLo)*0.15 || 1;
    document.getElementById('graphXMin').value = Math.floor((xLo-xPad)/(xPi?Math.PI:1));
    document.getElementById('graphXMax').value = Math.ceil((xHi+xPad)/(xPi?Math.PI:1));
  }
  previewGraph();
}

/* ---- Outil Diagramme statistique (camembert, barres, bâtons, histogramme) ---- */
let statsData = [];
let statsNextId = 1;
function openStatsTool(){
  hideAllToolContent();
  document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('statsPanel').style.display='block';
  document.getElementById('statsType').value = 'camembert';
  statsData = [
    {id:statsNextId++, label:'Chat', value:8},
    {id:statsNextId++, label:'Chien', value:12},
    {id:statsNextId++, label:'Aucun', value:6},
  ];
  renderStatsRows();
  document.getElementById('statsPanel').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function closeStatsTool(){ document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('statsPanel').style.display='none'; }
function addStatsRow(){
  statsData.push({id:statsNextId++, label:'', value:1});
  renderStatsRows();
}
function removeStatsRow(id){
  statsData = statsData.filter(r=>r.id!==id);
  renderStatsRows();
}
function updateStatsRow(id, field, value){
  const r = statsData.find(r=>r.id===id);
  if(r) r[field] = (field==='value') ? (parseFloat(value)||0) : value;
  previewStats();
}
function renderStatsRows(){
  const isHisto = document.getElementById('statsType').value==='histogramme';
  document.getElementById('statsHistoOptions').style.display = isHisto ? 'block' : 'none';
  if(isHisto && statsData.some(r=>r.classMin==null)){
    // Premier passage en histogramme : propose des classes contiguës par défaut (largeur 10),
    // que le professeur peut ensuite ajuster librement (tailles, poids, âges...).
    let start = 0;
    statsData.forEach(r=>{
      if(r.classMin==null){ r.classMin = start; r.classMax = start+10; r.label = `[${r.classMin};${r.classMax}[`; }
      start = r.classMax;
    });
  }
  const box = document.getElementById('statsRowsList');
  box.innerHTML = statsData.map((r,i)=>{
    const color = GRAPH_COLORS[i%GRAPH_COLORS.length];
    const swatch = `<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${color};margin-right:6px;"></span>`;
    const labelField = isHisto
      ? `<label class="hint" style="margin:0;">de <input type="number" value="${r.classMin??''}" placeholder="ex. 150" oninput="updateStatsClass(${r.id},'classMin',this.value)" style="width:60px;"> à <input type="number" value="${r.classMax??''}" placeholder="ex. 160" oninput="updateStatsClass(${r.id},'classMax',this.value)" style="width:60px;"> (tailles, poids, âges...)</label>`
      : `<input type="text" value="${escapeHtml(r.label)}" placeholder="catégorie" oninput="updateStatsRow(${r.id},'label',this.value)" style="width:110px;">`;
    return `<div class="tool-row" style="margin-bottom:6px;align-items:center;">
      ${swatch}
      ${labelField}
      <label class="hint" style="margin:0;">effectif : <input type="number" value="${r.value}" min="0" oninput="updateStatsRow(${r.id},'value',this.value)" style="width:60px;"></label>
      <button type="button" onclick="removeStatsRow(${r.id})" style="border:none;background:rgba(217,48,37,.1);color:#D93025;border-radius:6px;padding:3px 8px;cursor:pointer;"><span class=gicon>close</span></button>
    </div>`;
  }).join('');
  previewStats();
}
/* Met à jour une borne de classe (histogramme) et régénère automatiquement le libellé affiché
   (ex. "[150;160[") -- évite d'avoir à ressaisir l'intervalle à la main, et garantit une
   écriture cohérente d'une classe à l'autre. */
function updateStatsClass(id, field, value){
  const r = statsData.find(r=>r.id===id);
  if(!r) return;
  r[field] = value===''? null : parseFloat(value);
  r.label = (r.classMin!=null && r.classMax!=null) ? `[${frDecimal(r.classMin)};${frDecimal(r.classMax)}[` : '';
  previewStats();
}
function buildStatsSvg(){
  const type = document.getElementById('statsType').value;
  if(type==='camembert') return pieChartSvg(statsData);
  if(type==='histogramme') return histogramSvg(statsData, document.getElementById('statsHistoDensity').checked);
  return barLikeChartSvg(statsData, type);
}
function previewStats(){
  document.getElementById('statsPreview').innerHTML = statsData.length ? buildStatsSvg() : '';
}
function insertStats(){
  if(!statsData.length) return;
  const type = document.getElementById('statsType').value;
  const histoDensity = document.getElementById('statsHistoDensity').checked;
  addPendingBlock('stats', buildStatsSvg(), {type, histoDensity, rows:JSON.parse(JSON.stringify(statsData))}, 'reopenStats');
  closeStatsTool();
}
function reopenStats(data){
  openStatsTool();
  document.getElementById('statsType').value = data.type||'camembert';
  document.getElementById('statsHistoDensity').checked = !!data.histoDensity;
  statsData = JSON.parse(JSON.stringify(data.rows||[]));
  statsNextId = Math.max(1, ...statsData.map(r=>r.id+1));
  renderStatsRows();
}

/* ---- Outil Sac / urne de boules ---- */
const URN_COLORS = [{name:'Rouge',hex:'#D93025'},{name:'Bleu',hex:'#0D5BA3'},{name:'Vert',hex:'#1F7A4D'},{name:'Jaune',hex:'#E8B93A'},{name:'Noir',hex:'#1C1B2E'},{name:'Orange',hex:'#E35D3A'},{name:'Violet',hex:'#7B3FA0'},{name:'Blanc',hex:'#F5F0E8'}];
let urnData = [];
let urnNextId = 1;
/* Bascule entre les 4 outils de probabilités regroupés sous les mêmes onglets (sac/urne,
   cartes, dés, arbre) : affiche le panneau demandé, masque les 3 autres. */
const PROBA_TABS = [{panel:'urnPanel',tab:'probaTabUrn'},{panel:'cardsPanel',tab:'probaTabCards'},{panel:'dicePanel',tab:'probaTabDice'},{panel:'treePanel',tab:'probaTabTree'}];
function activateProbaTab(panelId){
  hideAllToolContent();
  document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('probaGroupWrap').style.display='block';
  PROBA_TABS.forEach(t=>{
    document.getElementById(t.panel).style.display = (t.panel===panelId) ? 'block' : 'none';
    document.getElementById(t.tab).classList.toggle('active', t.panel===panelId);
  });
}
function openUrnTool(){
  activateProbaTab('urnPanel');
  document.getElementById('urnShape').value = 'sac';
  urnData = [
    {id:urnNextId++, colorIdx:0, count:5},
    {id:urnNextId++, colorIdx:1, count:3},
  ];
  renderUrnRows();
  document.getElementById('probaGroupWrap').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function closeUrnTool(){ document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('probaGroupWrap').style.display='none'; }
function addUrnRow(){
  urnData.push({id:urnNextId++, colorIdx:urnData.length%URN_COLORS.length, count:1});
  renderUrnRows();
}
function removeUrnRow(id){
  urnData = urnData.filter(r=>r.id!==id);
  renderUrnRows();
}
function updateUrnRow(id, field, value){
  const r = urnData.find(r=>r.id===id);
  if(r) r[field] = field==='count' ? (parseInt(value)||0) : parseInt(value);
  previewUrn();
}
function renderUrnRows(){
  const box = document.getElementById('urnRowsList');
  box.innerHTML = urnData.map(r=>{
    const options = URN_COLORS.map((c,i)=>`<option value="${i}" ${i===r.colorIdx?'selected':''}>${c.name}</option>`).join('');
    return `<div class="tool-row" style="margin-bottom:6px;align-items:center;">
      <select onchange="updateUrnRow(${r.id},'colorIdx',this.value)">${options}</select>
      <label class="hint" style="margin:0;">nombre : <input type="number" value="${r.count}" min="0" oninput="updateUrnRow(${r.id},'count',this.value)" style="width:55px;"></label>
      <button type="button" onclick="removeUrnRow(${r.id})" style="border:none;background:rgba(217,48,37,.1);color:#D93025;border-radius:6px;padding:3px 8px;cursor:pointer;"><span class=gicon>close</span></button>
    </div>`;
  }).join('');
  previewUrn();
}
function urnDataForSvg(){
  return urnData.map(r=>({color:URN_COLORS[r.colorIdx].hex, label:URN_COLORS[r.colorIdx].name, count:r.count}));
}
function previewUrn(){
  document.getElementById('urnPreview').innerHTML = urnDataForSvg().some(d=>d.count>0) ? urnSvg(urnDataForSvg(), document.getElementById('urnShape').value) : '<p class="hint">Ajoute au moins une boule.</p>';
}
function insertUrn(){
  if(!urnDataForSvg().some(d=>d.count>0)) return;
  const shape = document.getElementById('urnShape').value;
  addPendingBlock('urn', urnSvg(urnDataForSvg(), shape), {shape, rows:JSON.parse(JSON.stringify(urnData))}, 'reopenUrn');
  closeUrnTool();
}
function reopenUrn(data){
  openUrnTool();
  document.getElementById('urnShape').value = data.shape||'sac';
  urnData = JSON.parse(JSON.stringify(data.rows||[]));
  urnNextId = Math.max(1, ...urnData.map(r=>r.id+1));
  renderUrnRows();
}

/* ---- Outil Cartes à jouer ---- */
const RANKS_32 = ['7','8','9','10','V','D','R','A'];
const RANKS_52 = ['2','3','4','5','6','7','8','9','10','V','D','R','A'];
const SUITS_ORDER = ['pique','coeur','carreau','trefle'];
let cardsSelected = new Set();
function openCardsTool(){
  activateProbaTab('cardsPanel');
  document.getElementById('cardsDeckType').value = '52';
  cardsSelected = new Set();
  renderCardsGrid();
  document.getElementById('probaGroupWrap').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function closeCardsTool(){ document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('probaGroupWrap').style.display='none'; }
function cardKey(rank,suit){ return rank+'-'+suit; }
function toggleCard(rank,suit){
  const k = cardKey(rank,suit);
  if(cardsSelected.has(k)) cardsSelected.delete(k); else cardsSelected.add(k);
  renderCardsGrid();
}
function setCardsPreset(preset){
  const ranks = document.getElementById('cardsDeckType').value==='32' ? RANKS_32 : RANKS_52;
  cardsSelected = new Set();
  if(preset==='all'){ ranks.forEach(r=>SUITS_ORDER.forEach(s=>cardsSelected.add(cardKey(r,s)))); }
  else if(preset==='aces'){ SUITS_ORDER.forEach(s=>cardsSelected.add(cardKey('A',s))); }
  else if(preset==='figures'){ ['V','D','R'].forEach(r=>SUITS_ORDER.forEach(s=>cardsSelected.add(cardKey(r,s)))); }
  renderCardsGrid();
}
function renderCardsGrid(){
  const ranks = document.getElementById('cardsDeckType').value==='32' ? RANKS_32 : RANKS_52;
  let html = '<table style="border-collapse:collapse;"><tr><td></td>' + ranks.map(r=>`<td style="text-align:center;font-size:.8rem;padding:2px 4px;">${r}</td>`).join('') + '</tr>';
  SUITS_ORDER.forEach(s=>{
    html += `<tr><td style="padding:2px 6px;font-size:1.1rem;color:${SUIT_COLORS[s]};">${SUIT_SYMBOLS[s]}</td>`;
    ranks.forEach(r=>{
      const on = cardsSelected.has(cardKey(r,s));
      html += `<td style="padding:1px;"><button type="button" onclick="toggleCard('${r}','${s}')" style="width:26px;height:26px;border-radius:5px;border:1px solid rgba(28,43,57,.25);background:${on?'#0D5BA3':'#fff'};color:${on?'#fff':'#333'};cursor:pointer;font-size:.75rem;">${on?'✓':''}</button></td>`;
    });
    html += '</tr>';
  });
  html += '</table>';
  document.getElementById('cardsGrid').innerHTML = html;
  previewCards();
}
function selectedCardsArr(){
  return [...cardsSelected].map(k=>{ const [rank,suit]=k.split('-'); return {rank,suit}; });
}
function previewCards(){
  document.getElementById('cardsPreview').innerHTML = cardsSelected.size ? cardsSvg(selectedCardsArr()) : '';
}
function insertCards(){
  if(!cardsSelected.size) return;
  addPendingBlock('cards', cardsSvg(selectedCardsArr()), {selected:[...cardsSelected], deck:document.getElementById('cardsDeckType').value}, 'reopenCards');
  closeCardsTool();
}
function reopenCards(data){
  openCardsTool();
  document.getElementById('cardsDeckType').value = data.deck||'52';
  cardsSelected = new Set(data.selected||[]);
  renderCardsGrid();
}

/* ---- Outil Dés ---- */
const DICE_FACES_OPTIONS = [4,6,8,10,12,20];
const DICE_COLORS = [{name:'Blanc',hex:'#fff'},{name:'Rouge',hex:'#D93025'},{name:'Bleu',hex:'#0D5BA3'},{name:'Vert',hex:'#1F7A4D'},{name:'Violet',hex:'#7B3FA0'},{name:'Noir',hex:'#1C1B2E'}];
let diceData = [];
let diceNextId = 1;
function openDiceTool(){
  activateProbaTab('dicePanel');
  diceData = [
    {id:diceNextId++, faces:6, value:4, colorIdx:0},
    {id:diceNextId++, faces:6, value:2, colorIdx:0},
  ];
  renderDiceRows();
  document.getElementById('probaGroupWrap').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function closeDiceTool(){ document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('probaGroupWrap').style.display='none'; }
function addDiceRow(){
  diceData.push({id:diceNextId++, faces:6, value:1, colorIdx:0});
  renderDiceRows();
}
function removeDiceRow(id){
  diceData = diceData.filter(r=>r.id!==id);
  renderDiceRows();
}
function updateDiceRow(id, field, value){
  const r = diceData.find(r=>r.id===id);
  if(!r) return;
  if(field==='faces'){ r.faces = parseInt(value); if(r.value>r.faces) r.value=r.faces; }
  else if(field==='value') r.value = Math.max(1, Math.min(r.faces, parseInt(value)||1));
  else if(field==='colorIdx') r.colorIdx = parseInt(value);
  renderDiceRows();
}
function renderDiceRows(){
  const box = document.getElementById('diceRowsList');
  box.innerHTML = diceData.map(r=>{
    const facesOptions = DICE_FACES_OPTIONS.map(f=>`<option value="${f}" ${f===r.faces?'selected':''}>d${f}</option>`).join('');
    const colorOptions = DICE_COLORS.map((c,i)=>`<option value="${i}" ${i===r.colorIdx?'selected':''}>${c.name}</option>`).join('');
    return `<div class="tool-row" style="margin-bottom:6px;align-items:center;">
      <select onchange="updateDiceRow(${r.id},'faces',this.value)">${facesOptions}</select>
      <label class="hint" style="margin:0;">valeur : <input type="number" value="${r.value}" min="1" max="${r.faces}" oninput="updateDiceRow(${r.id},'value',this.value)" style="width:50px;"></label>
      <select onchange="updateDiceRow(${r.id},'colorIdx',this.value)">${colorOptions}</select>
      <button type="button" onclick="removeDiceRow(${r.id})" style="border:none;background:rgba(217,48,37,.1);color:#D93025;border-radius:6px;padding:3px 8px;cursor:pointer;"><span class=gicon>close</span></button>
    </div>`;
  }).join('');
  previewDice();
}
function diceDataForSvg(){
  return diceData.map(r=>({faces:r.faces, value:r.value, color:DICE_COLORS[r.colorIdx].hex}));
}
function previewDice(){
  document.getElementById('dicePreview').innerHTML = diceSvg(diceDataForSvg());
}
function insertDice(){
  if(!diceData.length) return;
  addPendingBlock('dice', diceSvg(diceDataForSvg()), {rows:JSON.parse(JSON.stringify(diceData))}, 'reopenDice');
  closeDiceTool();
}
function reopenDice(data){
  openDiceTool();
  diceData = JSON.parse(JSON.stringify(data.rows||[]));
  diceNextId = Math.max(1, ...diceData.map(r=>r.id+1));
  renderDiceRows();
}

/* ---- Outil Arbre de probabilité ---- */
let treeRoot = null;
function openTreeTool(){
  activateProbaTab('treePanel');
  treeRoot = {label:'', children:[]};
  renderTreeEditor();
  document.getElementById('probaGroupWrap').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function closeTreeTool(){ document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('probaGroupWrap').style.display='none'; }
function treeGetNode(path){
  let n = treeRoot;
  for(const i of path) n = n.children[i];
  return n;
}
function treeAddBranch(pathStr){
  const path = pathStr==='' ? [] : pathStr.split('|').map(Number);
  const n = treeGetNode(path);
  if(!n.children) n.children = [];
  n.children.push({label:'', proba:'', children:[]});
  renderTreeEditor();
}
function treeRemoveBranch(parentPathStr, idx){
  const parentPath = parentPathStr==='' ? [] : parentPathStr.split('|').map(Number);
  const parent = treeGetNode(parentPath);
  parent.children.splice(idx,1);
  renderTreeEditor();
}
function treeUpdateNode(pathStr, field, value){
  const path = pathStr.split('|').map(Number);
  treeGetNode(path)[field] = value;
  previewTree();
}
/* Éditeur texte du parcours de l'arbre (une ligne par nœud, indentée selon la profondeur) --
   plus simple à manipuler qu'un rendu graphique interactif complexe, tout en autorisant une
   construction branche par branche, à n'importe quelle profondeur. */
function renderTreeEditor(){
  let html = '';
  function walk(node, path, depth){
    const pathStr = path.join('|');
    const indent = depth*22;
    const isLeaf = !(node.children && node.children.length);
    if(depth>0){
      const noteField = isLeaf ? `<input type="text" value="${escapeHtml(node.note||'')}" placeholder="note (résultat, calcul...)" oninput="treeUpdateNode('${pathStr}','note',this.value)" style="width:130px;">` : '';
      html += `<div class="tool-row" style="margin:4px 0;margin-left:${indent}px;align-items:center;">
        <span class="hint" style="margin:0;">↳</span>
        <input type="text" value="${escapeHtml(node.label)}" placeholder="événement" oninput="treeUpdateNode('${pathStr}','label',this.value)" style="width:100px;">
        <input type="text" value="${escapeHtml(node.proba)}" placeholder="proba (ex. 2/5)" oninput="treeUpdateNode('${pathStr}','proba',this.value)" style="width:90px;">
        ${noteField}
        <button type="button" onclick="treeAddBranch('${pathStr}')" style="border:none;background:rgba(28,43,57,.08);border-radius:6px;padding:3px 8px;cursor:pointer;">+ branche</button>
        <button type="button" onclick="treeRemoveBranch('${path.slice(0,-1).join('|')}',${path[path.length-1]})" style="border:none;background:rgba(217,48,37,.1);color:#D93025;border-radius:6px;padding:3px 8px;cursor:pointer;"><span class=gicon>close</span></button>
      </div>`;
    } else {
      html += `<div class="tool-row" style="margin:4px 0;align-items:center;">
        <span class="hint" style="margin:0;">Départ :</span>
        <button type="button" onclick="treeAddBranch('')" style="border:none;background:rgba(28,43,57,.08);border-radius:6px;padding:3px 8px;cursor:pointer;">+ branche</button>
      </div>`;
    }
    (node.children||[]).forEach((c,i)=>walk(c, [...path,i], depth+1));
  }
  walk(treeRoot, [], 0);
  html += `<p class="hint" style="margin:8px 0 0;">Astuce : événement, probabilité et note acceptent du LaTeX entre <code>$...$</code> -- ex. <code>$\\overline{A}$</code> pour A barre, <code>$P(B \\mid A)$</code> pour une probabilité conditionnelle, <code>$P(A \\cap B)$</code> pour une intersection.</p>`;
  document.getElementById('treeCanvas').innerHTML = html;
  previewTree();
}
function previewTree(){
  document.getElementById('treePreview').innerHTML = (treeRoot.children&&treeRoot.children.length) ? treeSvg(treeRoot) : '<p class="hint">Ajoute au moins une branche.</p>';
}
function insertTree(){
  if(!treeRoot.children || !treeRoot.children.length) return;
  addPendingBlock('tree', treeSvg(treeRoot), {root:JSON.parse(JSON.stringify(treeRoot))}, 'reopenTree');
  closeTreeTool();
}
function reopenTree(data){
  openTreeTool();
  treeRoot = JSON.parse(JSON.stringify(data.root||{label:'',children:[]}));
  renderTreeEditor();
}

function resetFigureState(){
  pushFigHistory();
  figState = {points:[], shapes:[], mode:(figState&&figState.mode)||'point', selected:[], refShape:null, nextLabel:0, lengthGroups:{}};
  renderFigureSvg();
}
function clearFigure(){ resetFigureState(); }
function clearAllCodes(){
  pushFigHistory();
  figState.shapes = figState.shapes.filter(s=>!['code-longueur','code-angle','code-droit'].includes(s.type));
  figState.shapes.forEach(s=>{ if(s.codeGroup) delete s.codeGroup; });
  figState.lengthGroups = {};
  renderFigureSvg();
}
/* Fenêtre unique listant TOUS les segments et angles présents dans la figure, avec un choix
   de codage pour chacun (au lieu de l'ancien système : choisir un type+groupe puis cliquer
   sur le canevas, jugé peu pratique). */
function openCodageManager(){
  const segments = figState.shapes.filter(s=>s.type==='segment');
  const angles = figState.shapes.filter(s=>s.type==='angle');
  // Les constructions perpendiculaire/médiatrice sont DÉFINITIONNELLEMENT des angles droits
  // (signalé : "il faut reconnaître les objets perpendiculaires") -- proposées séparément,
  // avec une simple case à cocher (pas de choix de groupe, juste "marquer" ou non).
  const perps = figState.shapes.filter(s=>s.type==='perpendiculaire' || s.type==='mediatrice');
  // Un point milieu implique DÉFINITIONNELLEMENT que ses deux moitiés sont de longueur
  // égale -- même principe que perpendiculaire/angle droit ci-dessus (signalé : "il
  // reconnaît l'angle droit mais plus le milieu").
  const milieux = figState.points.filter(p=>{
    if(!p.def || p.def.type!=='milieu') return false;
    const {a,b} = p.def;
    const halfA = segments.find(s=>(s.p1===a&&s.p2===p)||(s.p1===p&&s.p2===a));
    const halfB = segments.find(s=>(s.p1===b&&s.p2===p)||(s.p1===p&&s.p2===b));
    return halfA && halfB;
  }).map(p=>{
    const {a,b} = p.def;
    const halfA = segments.find(s=>(s.p1===a&&s.p2===p)||(s.p1===p&&s.p2===a));
    const halfB = segments.find(s=>(s.p1===b&&s.p2===p)||(s.p1===p&&s.p2===b));
    return {point:p, a, b, halfA, halfB};
  });
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.zIndex = '400';
  const groupOptions = (current, kind)=>{
    const labels = kind==='segment' ? ['1 trait','2 traits','3 traits','4 traits'] : ['1 arc','2 arcs','3 arcs','4 arcs'];
    let html = `<option value="">Aucun codage</option>`;
    if(kind==='angle') html += `<option value="droit" ${current==='droit'?'selected':''}>Angle droit</option>`;
    labels.forEach((l,i)=>{ const v=i+1; html += `<option value="${v}" ${current===v?'selected':''}>${l}</option>`; });
    return html;
  };
  const segRows = segments.map((s,i)=>`
    <div class="tool-row" style="margin:0 0 6px;align-items:center;">
      <span style="width:70px;font-family:'JetBrains Mono',monospace;">[${s.p1.label}${s.p2.label}]</span>
      <select data-kind="segment" data-idx="${i}">${groupOptions(s.codeGroup||'','segment')}</select>
    </div>`).join('');
  const angleRows = angles.map((s,i)=>{
    const existingDroit = figState.shapes.find(x=>x.type==='code-droit' && x.vertex===s.vertex && ((x.p1===s.p1&&x.p2===s.p2)||(x.p1===s.p2&&x.p2===s.p1)));
    const existingEgal = figState.shapes.find(x=>x.type==='code-angle' && x.vertex===s.vertex && ((x.p1===s.p1&&x.p2===s.p2)||(x.p1===s.p2&&x.p2===s.p1)));
    const current = existingDroit ? 'droit' : (existingEgal ? existingEgal.group : '');
    return `
    <div class="tool-row" style="margin:0 0 6px;align-items:center;">
      <span style="width:70px;font-family:'JetBrains Mono',monospace;">∠${s.p1.label}${s.vertex.label}${s.p2.label}</span>
      <select data-kind="angle" data-idx="${i}">${groupOptions(current,'angle')}</select>
    </div>`;
  }).join('');
  const perpRows = perps.map((s,i)=>{
    const existing = figState.shapes.find(x=>x.type==='code-droit' && x.sourceShape===s);
    const desc = s.type==='mediatrice' ? `Médiatrice de [${s.p1.label}${s.p2.label}]` : `Perpendiculaire à [${s.refA.label}${s.refB.label}] en ${s.through.label}`;
    return `
    <div class="tool-row" style="margin:0 0 6px;align-items:center;">
      <label class="hint" style="margin:0;display:flex;align-items:center;gap:6px;"><input type="checkbox" data-kind="perp" data-idx="${i}" ${existing?'checked':''}> ${desc}</label>
    </div>`;
  }).join('');
  const milieuRows = milieux.map((m,i)=>{
    const already = m.halfA.codeGroup && m.halfA.codeGroup===m.halfB.codeGroup;
    return `
    <div class="tool-row" style="margin:0 0 6px;align-items:center;">
      <label class="hint" style="margin:0;display:flex;align-items:center;gap:6px;"><input type="checkbox" data-kind="milieu" data-idx="${i}" ${already?'checked':''}> [${m.a.label}${m.point.label}] et [${m.point.label}${m.b.label}] égales (milieu ${m.point.label})</label>
    </div>`;
  }).join('');
  overlay.innerHTML = `
    <div class="modal-card" style="max-width:420px;max-height:80vh;overflow-y:auto;">
      <p style="font-weight:700;margin:0 0 12px;">Coder la figure</p>
      ${segments.length ? `<p class="hint" style="margin:0 0 6px;font-weight:700;">Segments</p>${segRows}` : ''}
      ${angles.length ? `<p class="hint" style="margin:14px 0 6px;font-weight:700;">Angles</p>${angleRows}` : ''}
      ${perps.length ? `<p class="hint" style="margin:14px 0 6px;font-weight:700;">Angles droits (perpendicularités)</p>${perpRows}` : ''}
      ${milieux.length ? `<p class="hint" style="margin:14px 0 6px;font-weight:700;">Longueurs égales (milieux)</p>${milieuRows}` : ''}
      ${(!segments.length && !angles.length && !perps.length && !milieux.length) ? `<p class="hint">Aucun segment ni angle dans la figure pour l'instant.</p>` : ''}
      <p class="hint" style="margin:14px 0 0;">Deux objets codés avec le même nombre de traits/arcs sont annoncés comme égaux entre eux.</p>
      <div class="figure-toolbar" style="margin-top:14px;">
        <button type="button" class="btn secondary" id="codageMgrClearAll"><span class=gicon>cleaning_services</span> Tout retirer</button>
        <button type="button" class="btn secondary" id="codageMgrCancel">Annuler</button>
        <button type="button" class="btn" id="codageMgrOk">Appliquer</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  function close(){ overlay.remove(); }
  overlay.querySelector('#codageMgrCancel').onclick = close;
  overlay.addEventListener('click', e=>{ if(e.target===overlay) close(); });
  overlay.querySelector('#codageMgrClearAll').onclick = ()=>{ clearAllCodes(); close(); };
  overlay.querySelector('#codageMgrOk').onclick = ()=>{
    pushFigHistory();
    overlay.querySelectorAll('select[data-kind="segment"]').forEach(sel=>{
      const s = segments[+sel.dataset.idx];
      const v = sel.value;
      if(v) s.codeGroup = +v; else delete s.codeGroup;
    });
    overlay.querySelectorAll('select[data-kind="angle"]').forEach(sel=>{
      const s = angles[+sel.dataset.idx];
      // Retire l'éventuel codage existant pour cet angle avant d'appliquer le nouveau choix.
      figState.shapes = figState.shapes.filter(x=>!(['code-droit','code-angle'].includes(x.type) && x.vertex===s.vertex && ((x.p1===s.p1&&x.p2===s.p2)||(x.p1===s.p2&&x.p2===s.p1))));
      const v = sel.value;
      if(v==='droit') figState.shapes.push({type:'code-droit', vertex:s.vertex, p1:s.p1, p2:s.p2});
      else if(v) figState.shapes.push({type:'code-angle', vertex:s.vertex, p1:s.p1, p2:s.p2, group:+v});
    });
    overlay.querySelectorAll('input[data-kind="perp"]').forEach(cb=>{
      const s = perps[+cb.dataset.idx];
      figState.shapes = figState.shapes.filter(x=>!(x.type==='code-droit' && x.sourceShape===s));
      if(cb.checked){
        let vertex, p1, p2;
        if(s.type==='mediatrice'){
          vertex = {x:(s.p1.x+s.p2.x)/2, y:(s.p1.y+s.p2.y)/2};
          p1 = s.p1;
          p2 = {x:vertex.x-(s.p2.y-s.p1.y), y:vertex.y+(s.p2.x-s.p1.x)};
        } else {
          vertex = s.through;
          p1 = {x:vertex.x+(s.refB.x-s.refA.x), y:vertex.y+(s.refB.y-s.refA.y)};
          p2 = {x:vertex.x-(s.refB.y-s.refA.y), y:vertex.y+(s.refB.x-s.refA.x)};
        }
        figState.shapes.push({type:'code-droit', vertex, p1, p2, sourceShape:s});
      }
    });
    overlay.querySelectorAll('input[data-kind="milieu"]').forEach(cb=>{
      const m = milieux[+cb.dataset.idx];
      if(cb.checked){
        // Réutilise un groupe déjà présent sur l'une des deux moitiés, sinon en crée un
        // nouveau (le suivant après le plus grand déjà utilisé dans la figure).
        const existingGroups = figState.shapes.filter(s=>s.codeGroup).map(s=>s.codeGroup);
        const group = m.halfA.codeGroup || m.halfB.codeGroup || (existingGroups.length ? Math.max(...existingGroups)+1 : 1);
        m.halfA.codeGroup = group;
        m.halfB.codeGroup = group;
      } else if(m.halfA.codeGroup && m.halfA.codeGroup===m.halfB.codeGroup){
        // Ne décoche que si les deux moitiés étaient effectivement dans le même groupe --
        // évite de retirer un codage manuel indépendant que l'utilisateur aurait choisi.
        delete m.halfA.codeGroup;
        delete m.halfB.codeGroup;
      }
    });
    renderFigureSvg();
    close();
  };
}
function lengthGroupFor(cm){
  if(!figState.lengthGroups) figState.lengthGroups = {};
  const key = (+cm).toFixed(2);
  if(!figState.lengthGroups[key]) figState.lengthGroups[key] = Object.keys(figState.lengthGroups).length+1;
  return figState.lengthGroups[key];
}
/* Miroir de lengthGroupFor, mais pour les angles -- carte SÉPARÉE (figState.angleGroups),
   pour que le compteur de groupes d'angles n'interfère jamais avec celui des longueurs (un
   "codage à 1 trait" pour une longueur et un "codage à 1 arc" pour un angle ne doivent pas
   être confondus). Deux angles de mesures DIFFÉRENTES obtiennent toujours des groupes
   différents, garantissant des codages visuellement distincts entre eux. */
function angleGroupFor(deg){
  if(!figState.angleGroups) figState.angleGroups = {};
  const key = (+deg).toFixed(2);
  if(!figState.angleGroups[key]) figState.angleGroups[key] = Object.keys(figState.angleGroups).length+1;
  return figState.angleGroups[key];
}
/* Modale personnalisée (pas niceModal, partagée par tout le site et pas adaptée à afficher
   plusieurs champs à la fois) : demande la valeur (longueur ou angle), éventuellement le
   sens (pour un angle), et si la valeur/le codage doivent être affichés sur la figure -- le
   tout en un seul écran plutôt que plusieurs fenêtres successives. Renvoie null si annulé. */
function figMeasureModal({title, unit, defaultValue, withDirection, initialShowValue, initialShowCode}){
  const showValueChecked = initialShowValue===undefined ? true : initialShowValue;
  const showCodeChecked = !!initialShowCode;
  return new Promise(resolve=>{
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.zIndex = '400';
    overlay.innerHTML = `
      <div class="modal-card" style="max-width:340px;">
        <p style="font-weight:700;margin:0 0 12px;">${title}</p>
        <div class="tool-row" style="margin-bottom:12px;align-items:center;">
          <input type="number" id="figMeasureInput" value="${defaultValue}" step="0.5" style="width:80px;padding:8px;border-radius:6px;border:1px solid rgba(28,43,57,.2);font-size:1rem;">
          <span>${unit}</span>
        </div>
        ${withDirection ? `
        <div class="tool-row" style="margin-bottom:12px;">
          <label class="hint" style="margin:0;"><input type="radio" name="figMeasureDir" value="horaire" checked> Horaire ↻</label>
          <label class="hint" style="margin:0;"><input type="radio" name="figMeasureDir" value="trigo"> Trigonométrique ↺</label>
        </div>` : ''}
        <div class="tool-row" style="margin-bottom:16px;">
          <label class="hint" style="margin:0;"><input type="checkbox" id="figMeasureShowValue" ${showValueChecked?'checked':''}> Afficher la valeur</label>
          <label class="hint" style="margin:0;"><input type="checkbox" id="figMeasureShowCode" ${showCodeChecked?'checked':''}> Afficher le codage</label>
        </div>
        <div class="figure-toolbar" style="margin:0;">
          <button type="button" class="btn secondary" id="figMeasureCancel">Annuler</button>
          <button type="button" class="btn" id="figMeasureOk">OK</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const input = overlay.querySelector('#figMeasureInput');
    setTimeout(()=>{ input.focus(); input.select(); }, 0);
    function close(result){ overlay.remove(); resolve(result); }
    overlay.querySelector('#figMeasureCancel').onclick = ()=>close(null);
    overlay.addEventListener('click', e=>{ if(e.target===overlay) close(null); });
    input.onkeydown = e=>{ if(e.key==='Enter') overlay.querySelector('#figMeasureOk').click(); };
    overlay.querySelector('#figMeasureOk').onclick = ()=>{
      const value = parseFloat(String(input.value).replace(',','.'));
      const direction = withDirection ? overlay.querySelector('input[name="figMeasureDir"]:checked').value : null;
      const showValue = overlay.querySelector('#figMeasureShowValue').checked;
      const showCode = overlay.querySelector('#figMeasureShowCode').checked;
      close({value, direction, showValue, showCode});
    };
  });
}
/* Clone profond de l'état de la figure, en préservant les références PARTAGÉES : un point
   référencé par plusieurs formes (ou par def/dependsOn d'un autre point) reste le MÊME objet
   cloné partout, pas une copie séparée à chaque endroit -- indispensable pour que le clone
   se comporte identiquement à l'original (recomputeDependents, cascade de suppression...). */
function cloneFigState(state){
  const pointMap = new Map();
  const newPoints = state.points.map(p=>{ const c={...p}; pointMap.set(p,c); return c; });
  const shapeMap = new Map();
  const newShapes = state.shapes.map(s=>{
    const c={...s};
    ['p1','p2','vertex','center'].forEach(k=>{ if(c[k] && pointMap.has(c[k])) c[k]=pointMap.get(c[k]); });
    shapeMap.set(s,c);
    return c;
  });
  newPoints.forEach(p=>{
    if(p.def){
      const nd={...p.def};
      Object.keys(nd).forEach(k=>{ if(pointMap.has(nd[k])) nd[k]=pointMap.get(nd[k]); else if(shapeMap.has(nd[k])) nd[k]=shapeMap.get(nd[k]); });
      p.def=nd;
    }
    if(p.dependsOn) p.dependsOn = p.dependsOn.map(dep=>pointMap.get(dep)||shapeMap.get(dep)||dep);
  });
  return {
    points:newPoints, shapes:newShapes, mode:state.mode, selected:[],
    nextLabel:state.nextLabel, lengthGroups:{...(state.lengthGroups||{})}, angleGroups:{...(state.angleGroups||{})}
  };
}
let figUndoStack = []; // clichés de l'état pris juste AVANT chaque modification
let figRedoStack = [];  // états qu'on peut "refaire" après avoir annulé
/* À appeler juste AVANT toute modification de figState.points/shapes (création, suppression,
   édition d'une mesure) -- capture l'état PRÉ-changement, pour que "annuler" puisse y
   revenir. Toute nouvelle action invalide la pile "refaire" (comportement standard). */
function pushFigHistory(){
  figUndoStack.push(cloneFigState(figState));
  figRedoStack = [];
  if(figUndoStack.length > 60) figUndoStack.shift();
}
function undoFigure(){
  if(!figUndoStack.length) return;
  figRedoStack.push(cloneFigState(figState)); // garde l'état actuel pour pouvoir y revenir avec "refaire"
  const restored = figUndoStack.pop();
  figState.points = restored.points; figState.shapes = restored.shapes; figState.selected = [];
  figState.lengthGroups = restored.lengthGroups; figState.angleGroups = restored.angleGroups;
  renderFigureSvg();
}
function redoFigure(){
  if(!figRedoStack.length) return;
  figUndoStack.push(cloneFigState(figState)); // garde l'état actuel pour pouvoir re-annuler ensuite
  const restored = figRedoStack.pop();
  figState.points = restored.points; figState.shapes = restored.shapes; figState.selected = [];
  figState.lengthGroups = restored.lengthGroups; figState.angleGroups = restored.angleGroups;
  renderFigureSvg();
}
/* Ouvre/ferme un sous-menu de la barre latérale (segment/droite/demi-droite ; cercle libre/cm ;
   droites remarquables & angles) -- en accordéon, un seul groupe ouvert à la fois, pour ne
   pas allonger indéfiniment la barre si plusieurs groupes restaient ouverts en même temps. */
/* Icône à bascule pour le compas : synchronisée avec la case à cocher cachée (compassToggle),
   que le reste du code (handleRadiusCircleClick, etc.) continue de lire tel quel -- rien
   d'autre à changer côté logique, seul l'habillage visuel change. */
function toggleCompassMode(){
  const cb = document.getElementById('compassToggle');
  cb.checked = !cb.checked;
  document.getElementById('compassToggleBtn').classList.toggle('active', cb.checked);
}
function toggleFigGroup(name){
  const id = 'figGroup'+name.charAt(0).toUpperCase()+name.slice(1);
  const el = document.getElementById(id);
  if(!el) return;
  const wasOpen = el.classList.contains('open');
  document.querySelectorAll('.fig-group-sub.open').forEach(g=>g.classList.remove('open'));
  if(!wasOpen) el.classList.add('open');
}
/* Choix d'un outil DANS un sous-menu : applique le mode, clone l'icône choisie sur le bouton
   principal du groupe (qui devient donc directement cliquable pour ce même outil la
   prochaine fois, sans repasser par le sous-menu), et referme le sous-menu -- pour ne pas
   avoir à le rouvrir à chaque fois qu'on reprend le même outil. */
function selectFigSubTool(name, btnEl){
  const mode = btnEl.dataset.mode;
  setFigureMode(mode);
  const primaryId = 'figPrimary'+name.charAt(0).toUpperCase()+name.slice(1);
  const primary = document.getElementById(primaryId);
  if(primary){
    primary.innerHTML = btnEl.innerHTML;
    primary.dataset.mode = mode;
    primary.classList.add('active');
  }
  const subId = 'figGroup'+name.charAt(0).toUpperCase()+name.slice(1);
  const sub = document.getElementById(subId);
  if(sub) sub.classList.remove('open');
}
function setFigureMode(mode){
  figState.mode = mode; figState.selected = []; figState.refShape = null;
  if(mode!=='deplacer'){ const svg=document.getElementById('figureSvg'); if(svg) svg.style.cursor='crosshair'; }
  if(mode!=='polygone') figPolygonPts = [];
  document.querySelectorAll('.fig-mode').forEach(b=>b.classList.toggle('active', b.dataset.mode===mode));
  document.querySelectorAll('.fig-group-sub.open').forEach(g=>g.classList.remove('open'));
  const hints = {
    point:'Cliquez pour placer un point.',
    deplacer:'Faites glisser un point existant pour le déplacer (les points construits, comme un milieu, suivent automatiquement).',
    segment:'Cliquez deux points existants pour tracer le segment qui les relie.',
    'segment-longueur':'Cliquez le point de départ, puis un point donnant la direction : la longueur exacte (en cm) vous sera demandée.',
    droite:'Cliquez deux points existants pour tracer la droite qui les relie.',
    'demi-droite':'Cliquez le point d\'origine du rayon, puis un second point donnant sa direction.',
    cercle:'Cliquez le centre, puis un point du cercle.',
    'cercle-rayon':'Cliquez le centre : le rayon exact (en cm) vous sera demandé.',
    arc:'Cliquez le centre, puis le point de départ de l\'arc, puis un point donnant la direction d\'arrivée.',
    milieu:'Cliquez deux points existants pour placer leur milieu.',
    angle:'Cliquez un point sur le premier côté, puis le sommet de l\'angle, puis un point sur le second côté.',
    perpendiculaire:'Cliquez directement sur une droite/un segment existant (ou deux points), puis le point par lequel doit passer la perpendiculaire.',
    parallele:'Cliquez directement sur une droite/un segment existant (ou deux points), puis le point par lequel doit passer la parallèle.',
    mediatrice:'Cliquez directement sur un segment existant (ou ses deux extrémités) pour tracer sa médiatrice.',
    bissectrice:'Cliquez un point sur le premier côté, puis le sommet de l\'angle, puis un point sur le second côté.',
    code:'Choisissez le type de codage ci-dessus, puis cliquez sur le segment ou l\'angle concerné.',
    triangle:'Cliquez 3 points existants pour tracer le triangle qui les relie.',
    polygone:'Cliquez les sommets un par un (points existants). Recliquez le tout premier point (une fois au moins 3 posés) pour refermer le polygone.',
    'polygone-regulier':'Cliquez le centre, puis un premier sommet (fixe le rayon et l\'orientation) -- le nombre de côtés se règle dans le champ à côté.',
    'angle-mesure':'Cliquez un point sur le premier côté, puis le sommet -- une fenêtre demande ensuite la mesure (en degrés) et le sens (horaire ou trigonométrique).',
    vecteur:'Cliquez deux points existants : l\'origine, puis l\'extrémité (avec la flèche).',
    'mesure-distance':'Cliquez directement un segment existant, ou deux points -- la distance affichée peut ensuite être déplacée (mode Déplacer), en restant toujours parallèle au segment.',
    'symetrie-axiale':'Cliquez directement sur l\'axe de symétrie (droite, demi-droite, segment ou côté de polygone), puis le point à transformer.',
    'symetrie-centrale':'Cliquez le centre de symétrie, puis le point à transformer.',
    translation:'Cliquez les deux points qui définissent le vecteur de translation, puis le point à déplacer.',
  };
  document.getElementById('figureHint').textContent = hints[mode] || '';
  renderFigureSvg();
}
function nextPointLabel(){
  const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let lab;
  do{ lab = letters[figState.nextLabel++ % letters.length]; } while(figState.points.some(p=>p.label===lab));
  return lab;
}
function svgCoordsFromEvent(svg, evt){
  const pt = svg.createSVGPoint();
  const t = evt.touches ? evt.touches[0] : evt;
  pt.x = t.clientX; pt.y = t.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}
function findNearbyPoint(x,y){
  const thresh = 18; // légèrement augmenté (16->18) : plus tolérant, cohérent avec les formes
  return figState.points.find(p=>Math.hypot(p.x-x,p.y-y)<thresh);
}
function distToSegment(px,py,ax,ay,bx,by){
  const dx=bx-ax, dy=by-ay;
  const len2 = dx*dx+dy*dy || 1;
  let t = ((px-ax)*dx+(py-ay)*dy)/len2;
  t = Math.max(0, Math.min(1,t));
  return Math.hypot(px-(ax+t*dx), py-(ay+t*dy));
}
/* Comme distToSegment, mais clampée seulement du côté de l'origine (a) : le rayon d'une
   demi-droite continue à l'infini au-delà de b, jamais avant a. */
function distToRay(px,py,ax,ay,bx,by){
  const dx=bx-ax, dy=by-ay;
  const len2 = dx*dx+dy*dy || 1;
  let t = ((px-ax)*dx+(py-ay)*dy)/len2;
  t = Math.max(0, t);
  return Math.hypot(px-(ax+t*dx), py-(ay+t*dy));
}
function distToLine(px,py,ax,ay,bx,by){
  const dx=bx-ax, dy=by-ay;
  const len=Math.hypot(dx,dy)||1;
  return Math.abs((px-ax)*dy-(py-ay)*dx)/len;
}
/* Rayon d'un cercle, quelle que soit sa forme de stockage (radius numérique posé via "Cercle
   cm", ou p2 = un point sur le cercle posé via le mode "Cercle" à main levée). */
function circleRadius(s){
  if(s.radius !== undefined) return s.radius;
  if(s.p2) return Math.hypot(s.p2.x-s.p1.x, s.p2.y-s.p1.y);
  return null;
}
/* Intersection de deux droites INFINIES portées par s1(p1,p2) et s2(p1,p2) -- fonctionne
   quel que soit le type réel (segment/droite/demi-droite), puisque seule la direction
   compte ici, pas les bornes. Renvoie null si parallèles (pas d'intersection unique). */
/* Borne le paramètre t selon le type d'objet : un segment est BORNÉ des deux côtés (t dans
   [0,1]), une demi-droite ne l'est que d'un côté (t >= 0, l'origine), une droite ne l'est pas
   du tout (s'étend à l'infini des deux côtés). Sans ce bornage, un point posé sur un segment
   pouvait être glissé au-delà de ses extrémités A et B (signalé). */
function clampTForShapeType(t, shapeType){
  if(shapeType==='segment') return Math.max(0, Math.min(1, t));
  if(shapeType==='demi-droite') return Math.max(0, t);
  return t;
}
function intersectLines(s1, s2){
  const d1x=s1.p2.x-s1.p1.x, d1y=s1.p2.y-s1.p1.y;
  const d2x=s2.p2.x-s2.p1.x, d2y=s2.p2.y-s2.p1.y;
  const denom = d1x*d2y - d1y*d2x;
  if(Math.abs(denom) < 1e-9) return null; // parallèles
  const t = ((s2.p1.x-s1.p1.x)*d2y - (s2.p1.y-s1.p1.y)*d2x) / denom;
  return {x: s1.p1.x+t*d1x, y: s1.p1.y+t*d1y};
}
/* Détecte si DEUX objets-lignes différents (segment/droite/demi-droite) passent tous les
   deux près du clic -- pour reconnaître une intersection plutôt qu'un simple point sur un
   seul objet. Seuil un peu plus large que findNearbyShape (le clic vise le croisement, pas
   forcément pile sur chaque trait). */
function findTwoNearbyLineShapes(x,y){
  const thresh = 16;
  const candidates = figState.shapes.filter(s=>{
    if(!['segment','droite','demi-droite'].includes(s.type)) return false;
    if(s.type==='segment') return distToSegment(x,y,s.p1.x,s.p1.y,s.p2.x,s.p2.y) < thresh;
    if(s.type==='droite') return distToLine(x,y,s.p1.x,s.p1.y,s.p2.x,s.p2.y) < thresh;
    return distToRay(x,y,s.p1.x,s.p1.y,s.p2.x,s.p2.y) < thresh;
  });
  if(candidates.length < 2) return null;
  return [candidates[0], candidates[1]];
}
/* Calcule 2 points représentatifs (définissant la direction ET la position) pour N'IMPORTE
   QUEL type de droite -- segment/droite/demi-droite/vecteur ont déjà p1/p2 directement,
   mais médiatrice (p1/p2 = les 2 extrémités du segment original, PAS de la médiatrice
   elle-même) et perpendiculaire/parallèle (refA/refB/through) ont une structure différente.
   Permet de traiter tous ces types UNIFORMÉMENT (détection de clic, point posé dessus,
   intersection) -- signalé : "la médiatrice n'est pas reconnue comme un vrai objet". */
function lineShapeEndpoints(s){
  if(s.type==='mediatrice'){
    const mid = {x:(s.p1.x+s.p2.x)/2, y:(s.p1.y+s.p2.y)/2};
    return {p1:mid, p2:{x:mid.x-(s.p2.y-s.p1.y), y:mid.y+(s.p2.x-s.p1.x)}};
  }
  if(s.type==='perpendiculaire'){
    return {p1:s.through, p2:{x:s.through.x-(s.refB.y-s.refA.y), y:s.through.y+(s.refB.x-s.refA.x)}};
  }
  if(s.type==='parallele'){
    return {p1:s.through, p2:{x:s.through.x+(s.refB.x-s.refA.x), y:s.through.y+(s.refB.y-s.refA.y)}};
  }
  return {p1:s.p1, p2:s.p2};
}
function findNearbyShape(x,y){
  // Seuil harmonisé avec findNearbyPoint (auparavant 10, sensiblement plus strict que les
  // points à 16 -- incohérence qui faisait rater le clic plus souvent sur une forme que sur
  // un point tout proche). Les cercles étaient aussi absents de cette détection manuelle
  // (seuls segment/droite étaient reconnus), rendant impossible le codage manuel d'un cercle.
  const thresh = 18;
  let best = null, bestLen = Infinity;
  figState.shapes.forEach(s=>{
    let match = false;
    if(s.type==='segment' || s.type==='vecteur' || s.type==='mesure-distance') match = distToSegment(x,y,s.p1.x,s.p1.y,s.p2.x,s.p2.y) < thresh;
    else if(s.type==='droite') match = distToLine(x,y,s.p1.x,s.p1.y,s.p2.x,s.p2.y) < thresh;
    else if(s.type==='demi-droite') match = distToRay(x,y,s.p1.x,s.p1.y,s.p2.x,s.p2.y) < thresh;
    else if(['mediatrice','perpendiculaire','parallele'].includes(s.type)){
      const {p1,p2} = lineShapeEndpoints(s);
      match = distToLine(x,y,p1.x,p1.y,p2.x,p2.y) < thresh;
    }
    else if(s.type==='cercle'){
      const r = circleRadius(s);
      match = r!=null && Math.abs(Math.hypot(x-s.p1.x, y-s.p1.y) - r) < thresh;
    }
    if(!match) return;
    // "Longueur" utilisée pour départager plusieurs formes qui se chevauchent (préfère la
    // plus spécifique) : le rayon pour un cercle (pas Infinity, qui empêchait TOUJOURS sa
    // sélection même seul candidat -- Infinity < Infinity est toujours faux).
    let len;
    if(s.p1 && s.p2) len = Math.hypot(s.p2.x-s.p1.x, s.p2.y-s.p1.y);
    else if(s.type==='cercle') len = circleRadius(s);
    else if(['perpendiculaire','parallele'].includes(s.type)) len = 500; // droite infinie : longueur arbitraire mais FINIE (Infinity empêcherait toute sélection, même seule candidate)
    else len = Infinity;
    if(best===null || len < bestLen){ bestLen = len; best = s; }
  });
  return best;
}
/* Pour le codage d'angle (3 clics sur des POINTS précis) : un clic loin de tout point mais
   proche d'un segment/droite/rayon déjà tracé se rabat sur l'extrémité de cette forme la
   plus proche du clic, plutôt que d'échouer silencieusement -- cliquer n'importe où le long
   d'un rayon suffit alors à désigner son point (signalé : "les clics ne sont pas détectés
   comme prévu"), sans obliger à viser précisément une extrémité, parfois minuscule ou
   entourée d'autres traits. */
function findPointOrNearestOnShape(x,y){
  const pt = findNearbyPoint(x,y);
  if(pt) return pt;
  const shape = findNearbyShape(x,y);
  if(shape && shape.p1 && shape.p2){
    const d1 = Math.hypot(shape.p1.x-x, shape.p1.y-y), d2 = Math.hypot(shape.p2.x-x, shape.p2.y-y);
    return d1<=d2 ? shape.p1 : shape.p2;
  }
  return null;
}
/* Vérifie si 2 segments/droites/demi-droites partagent la MÊME droite porteuse (colinéaires
   ET alignés, pas seulement parallèles) -- pour détecter le cas où un segment original a été
   coupé en plusieurs morceaux (ex. par un milieu), qui se chevauchent tous au même endroit. */
function areCollinear(s1, s2){
  const d1x=s1.p2.x-s1.p1.x, d1y=s1.p2.y-s1.p1.y;
  const d2x=s2.p2.x-s2.p1.x, d2y=s2.p2.y-s2.p1.y;
  const len1=Math.hypot(d1x,d1y)||1, len2=Math.hypot(d2x,d2y)||1;
  const cross = Math.abs(d1x*d2y-d1y*d2x)/(len1*len2);
  if(cross > 0.02) return false;
  const crossPoint = Math.abs((s2.p1.x-s1.p1.x)*d1y-(s2.p1.y-s1.p1.y)*d1x)/len1;
  return crossPoint < 3;
}
/* Trouve tous les segments/droites/demi-droites qui passent près du clic ET sont colinéaires
   entre eux (même droite porteuse) -- s'il y en a plusieurs, l'ambiguïté doit être résolue
   par un choix explicite plutôt qu'en prenant arbitrairement le plus proche (signalé : "il
   reconnaît [AI] ou [IB] car ça superpose [AB]"). */
function findCollinearGroup(x,y){
  const thresh = 18;
  const nearby = figState.shapes.filter(s=>{
    if(!['segment','droite','demi-droite'].includes(s.type)) return false;
    if(s.type==='segment') return distToSegment(x,y,s.p1.x,s.p1.y,s.p2.x,s.p2.y) < thresh;
    if(s.type==='droite') return distToLine(x,y,s.p1.x,s.p1.y,s.p2.x,s.p2.y) < thresh;
    return distToRay(x,y,s.p1.x,s.p1.y,s.p2.x,s.p2.y) < thresh;
  });
  if(!nearby.length) return [];
  // Une fois UN candidat trouvé près du clic, cherche TOUS les autres segments colinéaires
  // avec lui dans toute la figure -- pas seulement ceux physiquement proches du point cliqué
  // -- car l'ambiguïté ([AI] vs [IB] vs [AB] reconstitué) existe sur TOUTE la longueur de la
  // droite reconstituée, pas seulement près du point de jonction I.
  const ref = nearby[0];
  return figState.shapes.filter(s=>['segment','droite','demi-droite'].includes(s.type) && areCollinear(ref, s));
}
/* Reconstruit l'étendue COMPLÈTE d'origine à partir de plusieurs segments colinéaires
   chevauchants (ex. [AI] et [IB] -> [AB]) : les 2 points les plus éloignés parmi tous ceux
   référencés forment les extrémités du segment complet. */
function reconstructFullExtent(segs){
  const pts = [];
  segs.forEach(s=>{ pts.push(s.p1, s.p2); });
  let maxDist=-1, extremes=[pts[0], pts[0]];
  for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
    const d = Math.hypot(pts[i].x-pts[j].x, pts[i].y-pts[j].y);
    if(d>maxDist){ maxDist=d; extremes=[pts[i],pts[j]]; }
  }
  return {p1:extremes[0], p2:extremes[1]};
}
/* Modale de choix quand plusieurs segments colinéaires se chevauchent au clic -- propose
   chacun individuellement, plus une reconstruction de l'étendue complète si tous sont des
   segments (bornés, donc reconstructibles). */
function figShapeChoiceModal(candidates){
  return new Promise(resolve=>{
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.zIndex = '400';
    const allSegments = candidates.every(s=>s.type==='segment');
    let optionsHtml = candidates.map((s,i)=>{
      const label = s.type==='segment' ? `[${s.p1.label}${s.p2.label}]` : `${s.type} (${s.p1.label}${s.p2.label})`;
      return `<button type="button" class="btn secondary" data-idx="${i}" style="width:100%;margin-bottom:6px;">${label}</button>`;
    }).join('');
    if(allSegments && candidates.length>1){
      const full = reconstructFullExtent(candidates);
      optionsHtml += `<button type="button" class="btn" data-idx="full" style="width:100%;margin-bottom:6px;">[${full.p1.label}${full.p2.label}] (étendue complète)</button>`;
    }
    overlay.innerHTML = `
      <div class="modal-card" style="max-width:320px;">
        <p style="font-weight:700;margin:0 0 12px;">Plusieurs segments se chevauchent ici</p>
        <p class="hint" style="margin:0 0 12px;">Lequel voulez-vous utiliser comme référence ?</p>
        ${optionsHtml}
        <button type="button" class="btn secondary" id="figChoiceCancel" style="width:100%;">Annuler</button>
      </div>`;
    document.body.appendChild(overlay);
    function close(result){ overlay.remove(); resolve(result); }
    overlay.querySelector('#figChoiceCancel').onclick = ()=>close(null);
    overlay.addEventListener('click', e=>{ if(e.target===overlay) close(null); });
    overlay.querySelectorAll('button[data-idx]').forEach(btn=>{
      btn.onclick = ()=>{
        if(btn.dataset.idx==='full'){ close(reconstructFullExtent(candidates)); }
        else close({p1:candidates[+btn.dataset.idx].p1, p2:candidates[+btn.dataset.idx].p2});
      };
    });
  });
}
async function handleLineToolClick(x,y){
  if(!figState.refShape){
    const group = findCollinearGroup(x,y);
    if(group.length>1){
      const choice = await figShapeChoiceModal(group);
      if(!choice) return;
      if(figState.mode==='mediatrice'){ figState.shapes.push({type:'mediatrice', p1:choice.p1, p2:choice.p2}); renderFigureSvg(); return; }
      figState.refShape = choice; renderFigureSvg(); return;
    }
    const shape = findNearbyShape(x,y);
    if(shape){
      // La médiatrice ne dépend que du segment lui-même (pas d'un point "par lequel elle
      // passe" à préciser en plus, contrairement à perpendiculaire/parallèle) -- un clic
      // suffit donc, pas besoin d'un second (signalé : "on est obligé de cliquer 2 fois").
      if(figState.mode==='mediatrice'){ figState.shapes.push({type:'mediatrice', p1:shape.p1, p2:shape.p2}); renderFigureSvg(); return; }
      figState.refShape = {p1:shape.p1, p2:shape.p2}; renderFigureSvg(); return;
    }
    const pt = findNearbyPoint(x,y);
    if(pt){
      if(!figState.selected.length){ figState.selected.push(pt); renderFigureSvg(); return; }
      if(figState.selected[0]!==pt){
        figState.refShape = {p1:figState.selected[0], p2:pt};
        figState.selected = [];
        renderFigureSvg();
      }
    }
    return;
  }
  if(figState.mode==='mediatrice'){
    figState.shapes.push({type:'mediatrice', p1:figState.refShape.p1, p2:figState.refShape.p2});
    figState.refShape = null;
    renderFigureSvg();
    return;
  }
  const through = findNearbyPoint(x,y);
  if(!through) return;
  figState.shapes.push({type:figState.mode, refA:figState.refShape.p1, refB:figState.refShape.p2, through});
  figState.refShape = null;
  renderFigureSvg();
}
async function handleLengthSegmentClick(x,y){
  let start = findNearbyPoint(x,y);
  if(!start){ start = {label:nextPointLabel(), x, y}; figState.points.push(start); renderFigureSvg(); }
  const result = await figMeasureModal({title:'Longueur du segment', unit:'cm', defaultValue:5});
  if(!result) return; // annulé
  const cm = result.value;
  if(!isFinite(cm) || cm<=0){ document.getElementById('figureHint').textContent = 'Longueur invalide.'; renderFigureSvg(); return; }
  const px = cm*SCALE_PX_PER_CM;
  // Direction par défaut horizontale (vers la droite) -- ajustable ensuite en glissant le
  // second point autour du premier (mode Déplacer), qui tourne à rayon fixe sans jamais
  // changer la longueur déclarée, grâce à la contrainte déjà en place.
  const end = {label:nextPointLabel(), x:start.x+px, y:start.y};
  figState.points.push(end);
  const shape = {type:'segment', p1:start, p2:end};
  if(result.showValue) shape.lengthLabel = cm+' cm';
  if(result.showCode) shape.codeGroup = lengthGroupFor(cm);
  // lengthCm reste TOUJOURS mémorisé (indépendamment de l'affichage), car il sert à la
  // contrainte de déplacement (B tourne autour de A sans changer de longueur).
  shape.lengthCm = cm;
  figState.shapes.push(shape);
  renderFigureSvg();
}
async function handleRadiusCircleClick(x,y){
  let center = findNearbyPoint(x,y);
  if(!center){ center = {label:nextPointLabel(), x, y}; figState.points.push(center); renderFigureSvg(); }
  const result = await figMeasureModal({title:'Rayon du cercle', unit:'cm', defaultValue:3});
  if(!result) return;
  const cm = result.value;
  if(!isFinite(cm) || cm<=0){ document.getElementById('figureHint').textContent = 'Rayon invalide.'; renderFigureSvg(); return; }
  const px = cm*SCALE_PX_PER_CM;
  const withCompass = document.getElementById('compassToggle') && document.getElementById('compassToggle').checked;
  // radius stocké comme nombre fixe (pas un point) : le cercle garde sa taille exacte
  // même si on déplace ensuite le centre.
  const shape = {type:'cercle', p1:center, radius:px, radiusCm:cm, angle:0, compass:withCompass};
  if(result.showValue) shape.radiusLabel = cm+' cm';
  if(result.showCode) shape.codeGroup = lengthGroupFor(cm);
  figState.shapes.push(shape);
  renderFigureSvg();
}
function recomputeDependents(){
  // les points construits (ex. un milieu, ou l'image d'une transformation) se recalculent à
  // partir des points dont ils dépendent, donc si on déplace un point d'origine, tout ce qui
  // en découle suit automatiquement.
  figState.points.forEach(p=>{
    if(!p.def) return;
    if(p.def.type==='milieu'){
      p.x = (p.def.a.x + p.def.b.x)/2;
      p.y = (p.def.a.y + p.def.b.y)/2;
    } else if(p.def.type==='symetrie-axiale'){
      const {axisP1, axisP2, m} = p.def;
      const dx=axisP2.x-axisP1.x, dy=axisP2.y-axisP1.y, len2=dx*dx+dy*dy||1;
      const t = ((m.x-axisP1.x)*dx+(m.y-axisP1.y)*dy)/len2;
      const projX = axisP1.x+t*dx, projY = axisP1.y+t*dy;
      p.x = 2*projX-m.x; p.y = 2*projY-m.y;
    } else if(p.def.type==='symetrie-centrale'){
      const {center, m} = p.def;
      p.x = 2*center.x-m.x; p.y = 2*center.y-m.y;
    } else if(p.def.type==='translation'){
      const {vecP1, vecP2, m} = p.def;
      p.x = m.x+(vecP2.x-vecP1.x); p.y = m.y+(vecP2.y-vecP1.y);
    } else if(p.def.type==='point-sur-droite'){
      const {shape, t} = p.def;
      const {p1,p2} = lineShapeEndpoints(shape);
      p.x = p1.x+t*(p2.x-p1.x); p.y = p1.y+t*(p2.y-p1.y);
    } else if(p.def.type==='point-sur-cercle'){
      const {shape, offset} = p.def;
      const r = circleRadius(shape);
      const refAngle = shape.radius!=null ? (shape.angle||0) : Math.atan2(shape.p2.y-shape.p1.y, shape.p2.x-shape.p1.x);
      const a = refAngle+offset;
      p.x = shape.p1.x+r*Math.cos(a); p.y = shape.p1.y+r*Math.sin(a);
    } else if(p.def.type==='intersection'){
      const inter = intersectLines(p.def.s1, p.def.s2);
      if(inter){ p.x = inter.x; p.y = inter.y; }
    }
  });
}
let figDragLabel = null;
let figDragMeasure = null;
/* Un clic est considéré comme visant le LABEL d'un point (pas le point lui-même) si sa
   distance au texte du label est plus proche que sa distance au point -- le label étant
   petit et décalé, ce test simple (distance au centre approximatif du texte) suffit sans
   avoir besoin de connaître la vraie boîte englobante du texte SVG. */
function findNearbyLabel(x,y){
  const thresh = 14;
  return figState.points.find(p=>{
    const lx = p.x+(p.labelDx??9), ly = p.y+(p.labelDy??-9);
    return Math.hypot(lx-x, ly-y) < thresh;
  });
}
/* Position actuelle du label d'une mesure de distance : décalage 2D depuis le milieu du
   segment -- une composante LE LONG du segment (glisse d'un bout à l'autre) et une
   composante PERPENDICULAIRE (s'éloigne du trait) -- l'orientation du texte, elle, reste
   TOUJOURS parallèle au segment quel que soit ce décalage (signalé : "son écriture est
   parallèle au segment"). */
function measureLabelPos(s){
  const dx=s.p2.x-s.p1.x, dy=s.p2.y-s.p1.y, len=Math.hypot(dx,dy)||1;
  const ux=dx/len, uy=dy/len, nx=-uy, ny=ux;
  const midX=(s.p1.x+s.p2.x)/2, midY=(s.p1.y+s.p2.y)/2;
  const along = s.labelAlong ?? 0, perp = s.labelOffset ?? 18;
  return {x:midX+ux*along+nx*perp, y:midY+uy*along+ny*perp};
}
function findNearbyMeasureLabel(x,y){
  const thresh = 16;
  return figState.shapes.find(s=>{
    if(s.type!=='mesure-distance') return false;
    const {x:lx,y:ly} = measureLabelPos(s);
    return Math.hypot(lx-x, ly-y) < thresh;
  });
}
/* Modale d'édition du style d'une forme (mode Déplacer, clic sur un segment/droite/demi-
   droite/cercle/arc) : style de trait (épais/fin/pointillé) et couleur. Même principe que
   figMeasureModal (modale personnalisée, propre à cet outil). */
/* Détecte si une forme porte une mesure modifiable après coup (longueur donnée, rayon donné,
   angle donné) -- renvoie {type, value, unit} ou null si rien à modifier. */
function findEditableMeasure(shape){
  if(shape.type==='segment' && shape.lengthCm) return {type:'length', value:shape.lengthCm, unit:'cm'};
  if(shape.type==='cercle' && shape.radiusCm) return {type:'radius', value:shape.radiusCm, unit:'cm'};
  if(shape.type==='segment' && shape.angleDeg!=null) return {type:'angle', value:shape.angleDeg, unit:'degrés'};
  return null;
}
function figStyleModal(shape){
  return new Promise(resolve=>{
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.zIndex = '400';
    const widths = [{v:'fin',l:'Fin'},{v:'epais',l:'Épais'}];
    const patterns = [{v:'plein',l:'Plein'},{v:'pointille',l:'Pointillé'}];
    const colors = [{v:'#1C1B2E',l:'Noir'},{v:'#7A8A98',l:'Gris'},{v:'#D93025',l:'Rouge'},{v:'#0D5BA3',l:'Bleu'},{v:'#1F7A4D',l:'Vert'},{v:'#E35D3A',l:'Orange'}];
    const curWidth = shape.strokeWidth || 'fin';
    const curPattern = shape.strokePattern || 'plein';
    const curColor = shape.strokeColor || '#1C1B2E';
    const measure = findEditableMeasure(shape);
    const measureLabels = {length:'Modifier la longueur', radius:'Modifier le rayon', angle:'Modifier l\'angle'};
    overlay.innerHTML = `
      <div class="modal-card" style="max-width:320px;">
        <p style="font-weight:700;margin:0 0 12px;">Style du trait</p>
        <div class="tool-row" style="margin-bottom:10px;">
          ${widths.map(w=>`<label class="hint" style="margin:0;"><input type="radio" name="figStyleWidth" value="${w.v}" ${curWidth===w.v?'checked':''}> ${w.l}</label>`).join('')}
        </div>
        <div class="tool-row" style="margin-bottom:14px;">
          ${patterns.map(p=>`<label class="hint" style="margin:0;"><input type="radio" name="figStylePattern" value="${p.v}" ${curPattern===p.v?'checked':''}> ${p.l}</label>`).join('')}
        </div>
        <div class="tool-row" style="margin-bottom:18px;flex-wrap:wrap;gap:10px;">
          ${colors.map(c=>`<label style="display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;margin:0;">
            <input type="radio" name="figStyleColor" value="${c.v}" ${curColor===c.v?'checked':''} style="margin:0;">
            <span style="width:22px;height:22px;border-radius:50%;background:${c.v};border:1px solid rgba(0,0,0,.15);display:block;" title="${c.l}"></span>
          </label>`).join('')}
        </div>
        ${measure ? `<div class="tool-row" style="margin-bottom:10px;"><button type="button" class="btn secondary" id="figStyleEditMeasure" style="width:100%;">${measureLabels[measure.type]} (${measure.value} ${measure.unit})</button></div>` : ''}
        <div class="tool-row" style="margin-bottom:14px;">
          <button type="button" class="btn secondary" id="figStyleDelete" style="width:100%;color:#D93025;border-color:#D93025;"><span class=gicon>delete</span> Supprimer (et ses dépendances)</button>
        </div>
        <div class="figure-toolbar" style="margin:0;">
          <button type="button" class="btn secondary" id="figStyleCancel">Annuler</button>
          <button type="button" class="btn" id="figStyleOk">Appliquer le style</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    function close(result){ overlay.remove(); resolve(result); }
    overlay.querySelector('#figStyleCancel').onclick = ()=>close(null);
    overlay.addEventListener('click', e=>{ if(e.target===overlay) close(null); });
    overlay.querySelector('#figStyleDelete').onclick = ()=>close({action:'delete'});
    if(measure) overlay.querySelector('#figStyleEditMeasure').onclick = ()=>close({action:'edit-measure', measure});
    overlay.querySelector('#figStyleOk').onclick = ()=>{
      const strokeWidth = overlay.querySelector('input[name="figStyleWidth"]:checked').value;
      const strokePattern = overlay.querySelector('input[name="figStylePattern"]:checked').value;
      const strokeColor = overlay.querySelector('input[name="figStyleColor"]:checked').value;
      close({action:'style', strokeWidth, strokePattern, strokeColor});
    };
  });
}
/* Supprime une forme ET ses dépendances : les formes auxiliaires directement liées (codage,
   valeur affichée) qui référencent exactement les mêmes points deviennent orphelines et sont
   retirées aussi, puis un nettoyage récursif retire tout point de construction (milieu) qui
   n'est plus utilisé par rien, et toute forme qui référencerait un point ainsi supprimé. Les
   points "libres" posés intentionnellement par l'utilisateur ne sont eux jamais retirés
   automatiquement, même orphelins (pourraient être réutilisés ailleurs). */
/* Supprime un point OU une forme, ET toutes ses dépendances -- via un dictionnaire de
   dépendances (dependsOn, posé sur chaque point construit : milieu, symétrie, translation),
   plutôt qu'une détection au cas par cas. Un point qui dépend (directement ou indirectement)
   de la cible, ou de tout objet déjà supprimé en cascade, est retiré à son tour -- que la
   cible soit un point (ex. un point utilisé pour une translation) ou une forme (ex. le
   vecteur lui-même, signalé : "j'édite et je supprime le vecteur mais D ne s'efface pas").
   Les formes auxiliaires (codage/valeur) directement liées à une forme supprimée sont
   retirées aussi, et tout point construit devenu inutile (plus référencé par rien) est
   nettoyé, sans jamais toucher un point "libre" posé intentionnellement. */
function deleteObjectWithDependents(target){
  pushFigHistory();
  const isShape = figState.shapes.includes(target);
  if(isShape){
    const refPoints = [target.p1, target.p2, target.vertex, target.center].filter(Boolean);
    figState.shapes = figState.shapes.filter(s=>{
      if(s===target) return false;
      if(['angle-value','code-angle','code-droit'].includes(s.type)){
        const sPoints = [s.p1, s.p2, s.vertex].filter(Boolean);
        if(sPoints.length && sPoints.every(p=>refPoints.includes(p))) return false;
      }
      return true;
    });
  } else {
    figState.points = figState.points.filter(p=>p!==target);
  }
  const removed = new Set([target]);
  let changed = true;
  while(changed){
    changed = false;
    figState.points = figState.points.filter(p=>{
      if(p.dependsOn && p.dependsOn.some(dep=>removed.has(dep))){ removed.add(p); changed=true; return false; }
      return true;
    });
  }
  changed = true;
  while(changed){
    changed = false;
    // Un milieu devenu inutile -- plus référencé par aucune forme restante -- est nettoyé
    // aussi (spécifique au milieu : il a par nature des segments qui le référencent, donc
    // "plus référencé" est un signal fiable qu'il ne sert plus à rien. Les transformations
    // n'ont typiquement AUCUNE forme les référençant même quand tout va bien -- ce test ne
    // leur est donc PAS appliqué, sous peine de les supprimer à chaque suppression, quel que
    // soit l'objet visé).
    figState.points = figState.points.filter(p=>{
      const stillUsed = figState.shapes.some(s2=>s2.p1===p||s2.p2===p||s2.vertex===p||s2.center===p);
      const isMilieu = p.def && p.def.type==='milieu';
      if(!stillUsed && isMilieu){ changed=true; return false; }
      return true;
    });
    const before = figState.shapes.length;
    figState.shapes = figState.shapes.filter(s=>{
      const pts = [s.p1,s.p2,s.vertex,s.center].filter(Boolean);
      return pts.every(pt=>figState.points.includes(pt));
    });
    if(figState.shapes.length !== before) changed = true;
  }
  figState.selected = [];
  renderFigureSvg();
}
/* Modifie une mesure déjà donnée (longueur d'un segment, rayon d'un cercle, ou angle d'une
   construction d'angle) -- rouvre figMeasureModal pré-rempli avec la valeur actuelle, puis
   recalcule la position du point concerné pour respecter la nouvelle valeur (même direction/
   sens, juste la mesure qui change). */
async function editShapeMeasure(shape, measure){
  if(measure.type==='length'){
    const result = await figMeasureModal({title:'Longueur du segment', unit:'cm', defaultValue:measure.value,
      initialShowValue:!!shape.lengthLabel, initialShowCode:!!shape.codeGroup});
    if(!result) return;
    const cm = result.value;
    if(!isFinite(cm) || cm<=0) return;
    pushFigHistory();
    const dx=shape.p2.x-shape.p1.x, dy=shape.p2.y-shape.p1.y, len=Math.hypot(dx,dy)||1;
    const px = cm*SCALE_PX_PER_CM;
    shape.p2.x = shape.p1.x + dx/len*px;
    shape.p2.y = shape.p1.y + dy/len*px;
    shape.lengthCm = cm;
    if(result.showValue) shape.lengthLabel = cm+' cm'; else delete shape.lengthLabel;
    if(result.showCode) shape.codeGroup = lengthGroupFor(cm); else delete shape.codeGroup;
    recomputeDependents();
  } else if(measure.type==='radius'){
    const result = await figMeasureModal({title:'Rayon du cercle', unit:'cm', defaultValue:measure.value,
      initialShowValue:!!shape.radiusLabel, initialShowCode:!!shape.codeGroup});
    if(!result) return;
    const cm = result.value;
    if(!isFinite(cm) || cm<=0) return;
    pushFigHistory();
    shape.radius = cm*SCALE_PX_PER_CM;
    shape.radiusCm = cm;
    if(result.showValue) shape.radiusLabel = cm+' cm'; else delete shape.radiusLabel;
    if(result.showCode) shape.codeGroup = lengthGroupFor(cm); else delete shape.codeGroup;
  } else if(measure.type==='angle'){
    const angleShapeBefore = figState.shapes.find(s=>(s.type==='angle-value'||s.type==='code-angle') && s.vertex===shape.p1 && s.p2===shape.p2);
    const result = await figMeasureModal({title:'Mesure de l\'angle', unit:'degrés', defaultValue:measure.value, withDirection:true,
      initialShowValue: figState.shapes.some(s=>s.type==='angle-value' && s.vertex===shape.p1 && s.p2===shape.p2),
      initialShowCode: figState.shapes.some(s=>s.type==='code-angle' && s.vertex===shape.p1 && s.p2===shape.p2)});
    if(!result) return;
    const angleDeg = result.value;
    if(!isFinite(angleDeg) || angleDeg<=0 || angleDeg>=360) return;
    const vertex = shape.p1; // p1 est toujours le sommet pour un segment créé par angle-mesure
    const refPoint = angleShapeBefore ? angleShapeBefore.p1 : null;
    if(!refPoint) return; // pas assez d'info pour recalculer (aucune forme auxiliaire trouvée)
    pushFigHistory();
    const direction = result.direction || shape.angleDirection || 'horaire';
    const baseAngle = Math.atan2(refPoint.y-vertex.y, refPoint.x-vertex.x);
    const sign = direction==='trigo' ? -1 : 1;
    const newAngle = baseAngle + sign*angleDeg*Math.PI/180;
    const dist = Math.hypot(shape.p2.x-vertex.x, shape.p2.y-vertex.y);
    shape.p2.x = vertex.x + dist*Math.cos(newAngle);
    shape.p2.y = vertex.y + dist*Math.sin(newAngle);
    shape.angleDeg = angleDeg;
    shape.angleDirection = direction;
    // Retire puis recrée les formes auxiliaires (valeur/codage) selon les nouveaux choix,
    // au lieu de simplement mettre à jour l'existante -- permet d'ajouter ou de retirer
    // l'affichage, pas seulement de changer sa valeur.
    figState.shapes = figState.shapes.filter(s=>!((s.type==='angle-value'||s.type==='code-angle') && s.vertex===vertex && s.p2===shape.p2));
    if(result.showValue) figState.shapes.push({type:'angle-value', vertex, p1:refPoint, p2:shape.p2, deg:angleDeg});
    if(result.showCode) figState.shapes.push({type:'code-angle', vertex, p1:refPoint, p2:shape.p2, group:angleGroupFor(angleDeg)});
    recomputeDependents();
  }
  renderFigureSvg();
}
function onFigureMouseDown(evt){
  if(figState.mode!=='deplacer') return;
  const svg=document.getElementById('figureSvg');
  const {x,y} = svgCoordsFromEvent(svg,evt);
  const measureShape = findNearbyMeasureLabel(x,y);
  if(measureShape){ figDragMeasure = measureShape; svg.style.cursor='grabbing'; evt.preventDefault(); return; }
  const lbl = findNearbyLabel(x,y);
  const p = findNearbyPoint(x,y);
  const isMovableDependent = p && p.def && (p.def.type==='point-sur-droite' || p.def.type==='point-sur-cercle');
  const pDraggable = p && (!p.def || isMovableDependent);
  if(lbl && pDraggable){
    // Les deux sont à portée du clic : on privilégie celui dont on est le plus PROCHE, avec
    // une légère préférence pour le point en cas d'égalité -- déplacer le point est le geste
    // le plus fréquent (signalé : le label "gagnait" systématiquement, même quand on visait
    // clairement le point).
    const distToLabel = Math.hypot((lbl.x+(lbl.labelDx??9))-x, (lbl.y+(lbl.labelDy??-9))-y);
    const distToPoint = Math.hypot(p.x-x, p.y-y);
    if(distToPoint <= distToLabel+4){ figDragPoint = p; svg.style.cursor='grabbing'; evt.preventDefault(); return; }
    figDragLabel = lbl; svg.style.cursor='grabbing'; evt.preventDefault(); return;
  }
  if(lbl){ figDragLabel = lbl; svg.style.cursor='grabbing'; evt.preventDefault(); return; }
  if(pDraggable){ figDragPoint = p; svg.style.cursor='grabbing'; evt.preventDefault(); return; }
  // Ni un point, ni un label : un clic sur une forme (segment/droite/demi-droite/cercle/arc)
  // ouvre l'éditeur de style, plutôt que de ne rien faire.
  const shape = findNearbyShape(x,y);
  if(shape){
    evt.preventDefault();
    figStyleModal(shape).then(result=>{
      if(!result) return;
      if(result.action==='delete') deleteObjectWithDependents(shape);
      else if(result.action==='edit-measure') editShapeMeasure(shape, result.measure);
      else if(result.action==='style'){
        shape.strokeWidth = result.strokeWidth; shape.strokePattern = result.strokePattern; shape.strokeColor = result.strokeColor;
        renderFigureSvg();
      }
    });
  }
}
function onFigureMouseMove(evt){
  if(figDragMeasure){
    const svg=document.getElementById('figureSvg');
    const {x,y} = svgCoordsFromEvent(svg,evt);
    const s = figDragMeasure;
    const dx=s.p2.x-s.p1.x, dy=s.p2.y-s.p1.y, len=Math.hypot(dx,dy)||1;
    const ux=dx/len, uy=dy/len, nx=-uy, ny=ux;
    const midX=(s.p1.x+s.p2.x)/2, midY=(s.p1.y+s.p2.y)/2;
    const relX=x-midX, relY=y-midY;
    s.labelAlong = Math.max(-len/2-20, Math.min(len/2+20, relX*ux+relY*uy));
    s.labelOffset = Math.max(-80, Math.min(80, relX*nx+relY*ny));
    renderFigureSvg();
    return;
  }
  if(figDragLabel){
    const svg=document.getElementById('figureSvg');
    const {x,y} = svgCoordsFromEvent(svg,evt);
    figDragLabel.labelDx = Math.max(-40, Math.min(40, x-figDragLabel.x));
    figDragLabel.labelDy = Math.max(-40, Math.min(40, y-figDragLabel.y));
    renderFigureSvg();
    return;
  }
  if(!figDragPoint){
    // Pas de glissement en cours : retour visuel avant de cliquer -- le curseur devient une
    // main dès qu'on survole quelque chose de déplaçable (point, label) ou stylable/
    // supprimable (une forme), en mode Déplacer uniquement.
    const svg=document.getElementById('figureSvg');
    if(figState.mode==='deplacer'){
      const {x,y} = svgCoordsFromEvent(svg,evt);
      const hoverable = findNearbyMeasureLabel(x,y) || findNearbyLabel(x,y) || findNearbyPoint(x,y) || findNearbyShape(x,y);
      svg.style.cursor = hoverable ? 'grab' : 'default';
    }
    return;
  }
  const svg=document.getElementById('figureSvg');
  const {x,y} = svgCoordsFromEvent(svg,evt);
  let nx = Math.max(10,Math.min(490,x)), ny = Math.max(10,Math.min(310,y));
  // Un point posé SUR un objet (segment/droite/demi-droite/cercle) reste contraint à cet
  // objet en le déplaçant : on recalcule son paramètre (t le long de la droite, ou l'angle
  // sur le cercle) d'après la projection de la souris, plutôt qu'un déplacement libre.
  if(figDragPoint.def && figDragPoint.def.type==='point-sur-droite'){
    const {shape} = figDragPoint.def;
    const {p1,p2} = lineShapeEndpoints(shape);
    const dx=p2.x-p1.x, dy=p2.y-p1.y, len2=dx*dx+dy*dy||1;
    const t = clampTForShapeType(((nx-p1.x)*dx+(ny-p1.y)*dy)/len2, shape.type);
    figDragPoint.def.t = t;
    figDragPoint.x = p1.x+t*dx; figDragPoint.y = p1.y+t*dy;
    recomputeDependents();
    renderFigureSvg();
    return;
  }
  if(figDragPoint.def && figDragPoint.def.type==='point-sur-cercle'){
    const {shape} = figDragPoint.def;
    const r = circleRadius(shape);
    const refAngle = shape.radius!=null ? (shape.angle||0) : Math.atan2(shape.p2.y-shape.p1.y, shape.p2.x-shape.p1.x);
    const clickAngle = Math.atan2(ny-shape.p1.y, nx-shape.p1.x);
    figDragPoint.def.offset = clickAngle - refAngle;
    figDragPoint.x = shape.p1.x+r*Math.cos(clickAngle); figDragPoint.y = shape.p1.y+r*Math.sin(clickAngle);
    recomputeDependents();
    renderFigureSvg();
    return;
  }
  // Un point créé comme extrémité d'un "Segment cm" (p2) est TOUJOURS le point DÉPENDANT :
  // le déplacer ne doit jamais changer la longueur déclarée, il tourne donc autour de son
  // ancre (p1) au rayon fixe.
  const asDependent = figState.shapes.find(s=>s.type==='segment' && s.lengthCm && s.p2===figDragPoint);
  if(asDependent){
    const anchor = asDependent.p1;
    const fixedLen = asDependent.lengthCm * SCALE_PX_PER_CM;
    const dx = nx-anchor.x, dy = ny-anchor.y, d = Math.hypot(dx,dy)||1;
    figDragPoint.x = anchor.x + dx/d*fixedLen;
    figDragPoint.y = anchor.y + dy/d*fixedLen;
    recomputeDependents();
    renderFigureSvg();
    return;
  }
  // Sinon, si ce point sert lui-même d'ANCRE (p1) à un ou plusieurs segments à longueur fixe
  // (ex. A, origine commune de [AB] et [AC]), il se déplace LIBREMENT -- et tous ses
  // dépendants (B, C...) le SUIVENT en conservant leur longueur ET leur angle par rapport à
  // lui : tout le bloc rigide se déplace ensemble, sans se déformer (signalé : "les segments
  // changent de longueur alors que tout le bloc devrait se déplacer sans changer l'angle").
  const dependentSegs = figState.shapes.filter(s=>s.type==='segment' && s.lengthCm && s.p1===figDragPoint);
  if(dependentSegs.length){
    const deltaX = nx-figDragPoint.x, deltaY = ny-figDragPoint.y;
    figDragPoint.x = nx; figDragPoint.y = ny;
    dependentSegs.forEach(s=>{ s.p2.x += deltaX; s.p2.y += deltaY; });
    recomputeDependents();
    renderFigureSvg();
    return;
  }
  figDragPoint.x = nx;
  figDragPoint.y = ny;
  recomputeDependents();
  renderFigureSvg();
}
function onFigureMouseUp(){
  figDragPoint = null; figDragLabel = null; figDragMeasure = null;
  const svg=document.getElementById('figureSvg');
  if(svg && figState.mode==='deplacer') svg.style.cursor='grab';
}
/* Double-clic sur un point (ou directement son label) pour le renommer -- fonctionne quel
   que soit le mode d'outil actif (pas seulement "Déplacer"), puisque renommer un point ne
   modifie aucune construction, juste son étiquette. */
function figPointActionsModal(point){
  return new Promise(resolve=>{
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.zIndex = '400';
    overlay.innerHTML = `
      <div class="modal-card" style="max-width:300px;">
        <p style="font-weight:700;margin:0 0 14px;">Point ${point.label}</p>
        <div class="tool-row" style="margin-bottom:10px;">
          <button type="button" class="btn secondary" id="figPointRename" style="width:100%;"><span class=gicon>edit</span> Renommer</button>
        </div>
        <div class="tool-row" style="margin-bottom:14px;">
          <button type="button" class="btn secondary" id="figPointDelete" style="width:100%;color:#D93025;border-color:#D93025;"><span class=gicon>delete</span> Supprimer (et ses dépendances)</button>
        </div>
        <div class="figure-toolbar" style="margin:0;">
          <button type="button" class="btn secondary" id="figPointCancel" style="width:100%;">Annuler</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    function close(result){ overlay.remove(); resolve(result); }
    overlay.querySelector('#figPointCancel').onclick = ()=>close(null);
    overlay.addEventListener('click', e=>{ if(e.target===overlay) close(null); });
    overlay.querySelector('#figPointRename').onclick = ()=>close({action:'rename'});
    overlay.querySelector('#figPointDelete').onclick = ()=>close({action:'delete'});
  });
}
async function onFigureDblClick(evt){
  if(figState.mode!=='deplacer') return;
  const svg=document.getElementById('figureSvg');
  const {x,y} = svgCoordsFromEvent(svg,evt);
  const p = findNearbyLabel(x,y) || findNearbyPoint(x,y);
  if(!p) return;
  const result = await figPointActionsModal(p);
  if(!result) return;
  if(result.action==='delete'){
    deleteObjectWithDependents(p);
  } else if(result.action==='rename'){
    const newLabel = await nicePrompt('Nouveau nom du point :', p.label);
    if(newLabel && newLabel.trim()) p.label = newLabel.trim();
    renderFigureSvg();
  }
}
/* Crée le milieu de [a,b] : le point lui-même, ET les deux moitiés comme de VRAIS segments
   (a-milieu, milieu-b) -- sans ça, le codage (qui détecte un clic via findNearbyShape) ne
   reconnaît aucune forme à coder sur ces moitiés, seul le segment d'origine [a,b] existe
   comme forme (signalé : "il ne reconnaît pas les parties à coder pour le milieu"). Ces deux
   segments se superposent exactement au segment d'origine (même droite), donc leur ajout ne
   change rien visuellement -- seule la possibilité de les coder individuellement change. */
/* Crée une mesure de distance entre 2 points (existants ou une extrémité de segment) : la
   valeur affichée reste PARALLÈLE au segment quel que soit son orientation, et peut être
   déplacée (décalage perpendiculaire réglable), sans jamais changer d'orientation. */
function createDistanceMeasure(a, b){
  figState.shapes.push({type:'mesure-distance', p1:a, p2:b, labelOffset:18});
  renderFigureSvg();
}
function createMidpoint(a, b){
  const mid = {label:nextPointLabel(), x:(a.x+b.x)/2, y:(a.y+b.y)/2, def:{type:'milieu', a, b}, dependsOn:[a, b]};
  figState.points.push(mid);
  // Retire un éventuel segment/droite/demi-droite existant EXACTEMENT entre a et b (dans un
  // sens ou l'autre) : remplacé par ses deux moitiés, pas ajouté en plus.
  const originalIdx = figState.shapes.findIndex(s=>
    ['segment','droite','demi-droite'].includes(s.type) &&
    ((s.p1===a && s.p2===b) || (s.p1===b && s.p2===a))
  );
  if(originalIdx !== -1) figState.shapes.splice(originalIdx, 1);
  figState.shapes.push({type:'segment', p1:a, p2:mid});
  figState.shapes.push({type:'segment', p1:mid, p2:b});
  figState.selected = [];
  renderFigureSvg();
}
/* Polygone à nombre de côtés VARIABLE : chaque clic sur un point existant l'ajoute au
   polygone en construction (figState.polygonPts) ; recliquer sur le tout premier point
   (une fois au moins 3 points posés) referme le polygone -- crée un segment entre chaque
   paire consécutive, plus un dernier qui revient au point de départ. */
let figPolygonPts = [];
function handlePolygoneClick(x,y){
  const pt = findNearbyPoint(x,y);
  if(!pt) return;
  if(figPolygonPts.length>=3 && pt===figPolygonPts[0]){
    for(let i=0;i<figPolygonPts.length;i++){
      const a=figPolygonPts[i], b=figPolygonPts[(i+1)%figPolygonPts.length];
      figState.shapes.push({type:'segment', p1:a, p2:b});
    }
    figPolygonPts = [];
    renderFigureSvg();
    return;
  }
  if(!figPolygonPts.includes(pt)){ figPolygonPts.push(pt); renderFigureSvg(); }
}
/* Polygone RÉGULIER : 1er clic = centre, 2e clic = un premier sommet (fixe le rayon ET
   l'orientation de départ). Le nombre de côtés vient du champ dédié (polygonSidesInput) --
   les N-1 sommets restants sont calculés par répartition angulaire égale autour du centre,
   puis reliés en un polygone fermé. */
function handlePolygoneRegulierClick(x,y){
  if(!figState.selected.length){
    const pt = findNearbyPoint(x,y);
    if(pt){ figState.selected.push(pt); renderFigureSvg(); }
    return;
  }
  const center = figState.selected[0];
  const firstVertex = findNearbyPoint(x,y);
  if(!firstVertex || firstVertex===center) return;
  figState.selected = [];
  const raw = document.getElementById('polygonSidesInput').value;
  const n = parseInt(raw, 10);
  if(!isFinite(n) || n<3){ document.getElementById('figureHint').textContent = 'Nombre de côtés invalide (au moins 3).'; renderFigureSvg(); return; }
  const radius = Math.hypot(firstVertex.x-center.x, firstVertex.y-center.y);
  const startAngle = Math.atan2(firstVertex.y-center.y, firstVertex.x-center.x);
  const vertices = [firstVertex];
  for(let k=1;k<n;k++){
    const a = startAngle + k*2*Math.PI/n;
    vertices.push({label:nextPointLabel(), x:center.x+radius*Math.cos(a), y:center.y+radius*Math.sin(a)});
  }
  vertices.slice(1).forEach(v=>figState.points.push(v));
  for(let i=0;i<n;i++){
    figState.shapes.push({type:'segment', p1:vertices[i], p2:vertices[(i+1)%n]});
  }
  renderFigureSvg();
}
/* Angle de MESURE donnée : 1er clic = un point sur le premier côté, 2e clic = le sommet --
   puis une modale demande la mesure (en degrés) et le sens (horaire ou trigonométrique). Le
   second côté est un nouveau point, placé à la distance choisie (arbitraire, la même que la
   distance sommet<->point du 1er côté, pour un rendu visuel cohérent) selon l'angle calculé. */
async function handleAngleMesureClick(x,y){
  if(!figState.selected.length){
    let pt = findNearbyPoint(x,y);
    if(!pt){ pt = {label:nextPointLabel(), x, y}; figState.points.push(pt); renderFigureSvg(); }
    figState.selected.push(pt);
    return;
  }
  const refPoint = figState.selected[0];
  let vertex = findNearbyPoint(x,y);
  if(!vertex){ vertex = {label:nextPointLabel(), x, y}; figState.points.push(vertex); }
  if(vertex===refPoint) return;
  figState.selected = [];
  renderFigureSvg();
  const result = await figMeasureModal({title:'Mesure de l\'angle (depuis le premier côté)', unit:'degrés', defaultValue:60, withDirection:true});
  if(!result) return;
  const angleDeg = result.value;
  if(!isFinite(angleDeg) || angleDeg<=0 || angleDeg>=360){ document.getElementById('figureHint').textContent = 'Mesure invalide (entre 0 et 360°).'; return; }
  const baseAngle = Math.atan2(refPoint.y-vertex.y, refPoint.x-vertex.x);
  // En coordonnées écran (y vers le bas), ajouter à l'angle tourne visuellement dans le sens
  // horaire ; soustraire tourne dans le sens trigonométrique (antihoraire), comme en maths.
  const sign = result.direction==='trigo' ? -1 : 1;
  const newAngle = baseAngle + sign*angleDeg*Math.PI/180;
  const dist = Math.max(40, Math.hypot(refPoint.x-vertex.x, refPoint.y-vertex.y));
  const newPoint = {label:nextPointLabel(), x:vertex.x+dist*Math.cos(newAngle), y:vertex.y+dist*Math.sin(newAngle)};
  figState.points.push(newPoint);
  // S'assure que le 1er côté (sommet<->référence) existe visuellement : s'il n'y avait pas
  // déjà de segment entre ces deux points (ex. refPoint venait d'être créé à la volée),
  // l'angle ne montrerait sinon qu'un seul côté.
  const firstSideExists = figState.shapes.some(s=>s.type==='segment' && ((s.p1===vertex&&s.p2===refPoint)||(s.p1===refPoint&&s.p2===vertex)));
  if(!firstSideExists) figState.shapes.push({type:'segment', p1:vertex, p2:refPoint});
  // angleDeg/angleDirection restent mémorisés sur ce segment, INDÉPENDAMMENT de l'affichage
  // valeur/codage choisi -- permet de modifier l'angle plus tard même si ni l'un ni l'autre
  // n'a été affiché au départ.
  figState.shapes.push({type:'segment', p1:vertex, p2:newPoint, angleDeg, angleDirection:result.direction});
  if(result.showValue) figState.shapes.push({type:'angle-value', vertex, p1:refPoint, p2:newPoint, deg:angleDeg});
  if(result.showCode) figState.shapes.push({type:'code-angle', vertex, p1:refPoint, p2:newPoint, group:angleGroupFor(angleDeg)});
  renderFigureSvg();
}
function onFigureClick(evt){
  if(figState.mode==='deplacer') return; // géré par mousedown/mousemove
  pushFigHistory();
  const svg=document.getElementById('figureSvg');
  const {x,y} = svgCoordsFromEvent(svg,evt);
  if(figState.mode==='point'){
    if(findNearbyPoint(x,y)) return;
    const twoShapes = findTwoNearbyLineShapes(x,y);
    if(twoShapes){
      const [s1,s2] = twoShapes;
      const inter = intersectLines(s1,s2);
      if(inter){
        figState.points.push({label:nextPointLabel(), x:inter.x, y:inter.y, def:{type:'intersection', s1, s2}, dependsOn:[s1,s2]});
        renderFigureSvg();
        return;
      }
    }
    const shape = findNearbyShape(x,y);
    if(shape && ['segment','droite','demi-droite','mediatrice','perpendiculaire','parallele'].includes(shape.type)){
      const {p1,p2} = lineShapeEndpoints(shape);
      const dx=p2.x-p1.x, dy=p2.y-p1.y, len2=dx*dx+dy*dy||1;
      const t = clampTForShapeType(((x-p1.x)*dx+(y-p1.y)*dy)/len2, shape.type);
      const hasRealPoints = ['segment','droite','demi-droite'].includes(shape.type);
      const dependsOn = hasRealPoints ? [shape.p1, shape.p2, shape] : [shape];
      figState.points.push({label:nextPointLabel(), x:p1.x+t*dx, y:p1.y+t*dy, def:{type:'point-sur-droite', shape, t}, dependsOn});
      renderFigureSvg();
      return;
    }
    if(shape && shape.type==='cercle'){
      const r = circleRadius(shape);
      const refAngle = shape.radius!=null ? (shape.angle||0) : Math.atan2(shape.p2.y-shape.p1.y, shape.p2.x-shape.p1.x);
      const clickAngle = Math.atan2(y-shape.p1.y, x-shape.p1.x);
      const offset = clickAngle - refAngle;
      const deps = [shape.p1, shape].filter(Boolean);
      if(shape.p2) deps.push(shape.p2);
      figState.points.push({label:nextPointLabel(), x:shape.p1.x+r*Math.cos(clickAngle), y:shape.p1.y+r*Math.sin(clickAngle), def:{type:'point-sur-cercle', shape, offset}, dependsOn:deps});
      renderFigureSvg();
      return;
    }
    figState.points.push({label:nextPointLabel(), x, y});
    renderFigureSvg();
    return;
  }
  if(figState.mode==='segment-longueur'){ handleLengthSegmentClick(x,y); return; }
  if(figState.mode==='cercle-rayon'){ handleRadiusCircleClick(x,y); return; }
  if(figState.mode==='perpendiculaire' || figState.mode==='parallele' || figState.mode==='mediatrice'){ handleLineToolClick(x,y); return; }
  if(figState.mode==='polygone'){ handlePolygoneClick(x,y); return; }
  if(figState.mode==='polygone-regulier'){ handlePolygoneRegulierClick(x,y); return; }
  if(figState.mode==='angle-mesure'){ handleAngleMesureClick(x,y); return; }
  if(figState.mode==='milieu'){
    // Un clic direct sur le segment (pas seulement ses 2 extrémités) sélectionne les deux
    // points d'un coup -- plus rapide que d'avoir à cliquer précisément chaque extrémité.
    if(!figState.selected.length){
      const shape = findNearbyShape(x,y);
      if(shape && (shape.type==='segment' || shape.type==='droite' || shape.type==='demi-droite')){ createMidpoint(shape.p1, shape.p2); return; }
    }
  }
  if(figState.mode==='mesure-distance' && !figState.selected.length){
    const shape = findNearbyShape(x,y);
    if(shape && ['segment','droite','demi-droite','vecteur'].includes(shape.type)){
      createDistanceMeasure(shape.p1, shape.p2);
      return;
    }
  }
  if(figState.mode==='translation' && !figState.selected.length){
    // Un clic direct sur un vecteur déjà tracé sélectionne ses deux points (origine +
    // extrémité) d'un coup -- plus simple que de cliquer 2 points séparés (signalé : "cliquer
    // uniquement sur le vecteur serait plus simple"). Le vecteur lui-même est mémorisé (pas
    // seulement ses 2 points) pour que le supprimer entraîne bien ses translatés en cascade.
    const shape = findNearbyShape(x,y);
    if(shape && shape.type==='vecteur'){ figState.selectedVectorShape = shape; figState.selected.push(shape.p1, shape.p2); renderFigureSvg(); return; }
  }
  if(figState.mode==='symetrie-axiale' && !figState.selected.length){
    // Un clic direct sur un axe déjà tracé (droite, demi-droite, ou segment -- un côté de
    // polygone est déjà un simple segment, donc couvert ici aussi) sélectionne ses deux
    // points d'un coup, plutôt que de cliquer 2 points séparés pour définir l'axe.
    const shape = findNearbyShape(x,y);
    if(shape && ['droite','demi-droite','segment'].includes(shape.type)){ figState.selectedAxisShape = shape; figState.selected.push(shape.p1, shape.p2); renderFigureSvg(); return; }
  }

  const canCreatePoint = ['segment','droite','demi-droite'].includes(figState.mode);
  let near = findNearbyPoint(x,y);
  if(!near && canCreatePoint){
    near = {label:nextPointLabel(), x, y};
    figState.points.push(near);
  }
  if(!near || figState.selected.includes(near)) return;
  figState.selected.push(near);
  const neededMap = {angle:3, bissectrice:3, arc:3, triangle:3, 'symetrie-axiale':3, translation:3};
  const needed = neededMap[figState.mode] || 2;
  if(figState.selected.length===needed){
    const withCompass = document.getElementById('compassToggle') && document.getElementById('compassToggle').checked;
    if(figState.mode==='milieu'){
      const [a,b] = figState.selected;
      createMidpoint(a, b);
      return;
    } else if(figState.mode==='triangle'){
      const [p1,p2,p3] = figState.selected;
      figState.shapes.push({type:'segment', p1, p2}, {type:'segment', p1:p2, p2:p3}, {type:'segment', p1:p3, p2:p1});
    } else if(figState.mode==='symetrie-axiale'){
      const [axisP1, axisP2, m] = figState.selected;
      const dx=axisP2.x-axisP1.x, dy=axisP2.y-axisP1.y, len2=dx*dx+dy*dy||1;
      const t = ((m.x-axisP1.x)*dx+(m.y-axisP1.y)*dy)/len2;
      const projX = axisP1.x+t*dx, projY = axisP1.y+t*dy;
      const dependsOn = [axisP1, axisP2, m];
      if(figState.selectedAxisShape) dependsOn.push(figState.selectedAxisShape);
      figState.selectedAxisShape = null;
      figState.points.push({label:nextPointLabel(), x:2*projX-m.x, y:2*projY-m.y, def:{type:'symetrie-axiale', axisP1, axisP2, m}, dependsOn});
    } else if(figState.mode==='symetrie-centrale'){
      const [center, m] = figState.selected;
      figState.points.push({label:nextPointLabel(), x:2*center.x-m.x, y:2*center.y-m.y, def:{type:'symetrie-centrale', center, m}, dependsOn:[center, m]});
    } else if(figState.mode==='translation'){
      const [vecP1, vecP2, m] = figState.selected;
      // Si un vecteur EXISTANT a servi (via le raccourci de clic direct), il est lui-même
      // inclus dans les dépendances -- le supprimer fait donc disparaître son translaté en
      // cascade, même si les points vecP1/vecP2 restent (signalé : "j'édite et je supprime le
      // vecteur mais D ne s'efface pas").
      const dependsOn = [vecP1, vecP2, m];
      if(figState.selectedVectorShape) dependsOn.push(figState.selectedVectorShape);
      figState.selectedVectorShape = null;
      figState.points.push({label:nextPointLabel(), x:m.x+(vecP2.x-vecP1.x), y:m.y+(vecP2.y-vecP1.y), def:{type:'translation', vecP1, vecP2, m}, dependsOn});
    } else if(figState.mode==='angle' || figState.mode==='bissectrice'){
      const [p1,vertex,p2] = figState.selected; // le sommet est le 2e point cliqué
      figState.shapes.push({type:figState.mode, vertex, p1, p2});
    } else if(figState.mode==='arc'){
      const [center,p1,p2] = figState.selected;
      figState.shapes.push({type:'arc', center, p1, p2, compass:withCompass});
    } else if(figState.mode==='cercle'){
      const [a,b] = figState.selected;
      figState.shapes.push({type:'cercle', p1:a, p2:b, compass:withCompass});
    } else if(figState.mode==='mesure-distance'){
      const [a,b] = figState.selected;
      figState.shapes.push({type:'mesure-distance', p1:a, p2:b, labelOffset:18});
    } else {
      const [a,b] = figState.selected;
      figState.shapes.push({type:figState.mode, p1:a, p2:b});
    }
    figState.selected = [];
  }
  renderFigureSvg();
}
function angleDegrees(vertex,p1,p2){
  const a1 = Math.atan2(p1.y-vertex.y, p1.x-vertex.x);
  const a2 = Math.atan2(p2.y-vertex.y, p2.x-vertex.x);
  let diff = Math.abs(a1-a2)*180/Math.PI;
  if(diff>180) diff = 360-diff;
  return Math.round(diff);
}
function angleArcPoints(vertex,p1,p2,r){
  const a1 = Math.atan2(p1.y-vertex.y, p1.x-vertex.x);
  let a2 = Math.atan2(p2.y-vertex.y, p2.x-vertex.x);
  let delta = a2-a1;
  while(delta> Math.PI) delta-=2*Math.PI;
  while(delta<-Math.PI) delta+=2*Math.PI;
  const steps=18, pts=[];
  for(let i=0;i<=steps;i++){
    const a=a1+delta*(i/steps);
    pts.push(`${vertex.x+r*Math.cos(a)},${vertex.y+r*Math.sin(a)}`);
  }
  return {points:pts.join(' '), mid:a1+delta/2};
}
function compassGraphic(center, pencil){
  const r = Math.hypot(pencil.x-center.x, pencil.y-center.y) || 1;
  const legLen = 0.7*r+30;
  const mid = {x:(center.x+pencil.x)/2, y:(center.y+pencil.y)/2};
  const ux=(pencil.x-center.x)/r, uy=(pencil.y-center.y)/r;
  let perp = {x:-uy, y:ux};
  if(perp.y>0) perp={x:uy,y:-ux};
  const h = Math.sqrt(Math.max(0, legLen*legLen-(r/2)*(r/2)));
  const H = {x:mid.x+perp.x*h, y:mid.y+perp.y*h};
  return `<line x1="${center.x}" y1="${center.y}" x2="${H.x}" y2="${H.y}" stroke="#5B6B78" stroke-width="2" stroke-linecap="round"/>
          <line x1="${pencil.x}" y1="${pencil.y}" x2="${H.x}" y2="${H.y}" stroke="#5B6B78" stroke-width="2" stroke-linecap="round"/>
          <circle cx="${H.x}" cy="${H.y}" r="5" fill="#5B6B78"/>
          <circle cx="${pencil.x}" cy="${pencil.y}" r="4" fill="#E35D3A"/>`;
}
const CODE_GROUP_COLORS = {1:'#E35D3A', 2:'#1F3A5C', 3:'#1F6B3A'};
function renderLengthCode(p1,p2,group,color){
  color = color || CODE_GROUP_COLORS[group] || '#E35D3A';
  const dx=p2.x-p1.x, dy=p2.y-p1.y; const len=Math.hypot(dx,dy)||1;
  const ux=dx/len, uy=dy/len;
  const segAngle = Math.atan2(dy,dx);
  const tilt = segAngle + 65*Math.PI/180;
  const tx=Math.cos(tilt), ty=Math.sin(tilt);
  const mid={x:(p1.x+p2.x)/2, y:(p1.y+p2.y)/2};
  const spacing=6, offsetStart=-((group-1)*spacing)/2;
  let html='';
  for(let i=0;i<group;i++){
    const off=offsetStart+i*spacing;
    const cx=mid.x+ux*off, cy=mid.y+uy*off;
    html+=`<line x1="${cx-tx*5.5}" y1="${cy-ty*5.5}" x2="${cx+tx*5.5}" y2="${cy+ty*5.5}" stroke="${color}" stroke-width="1.1"/>`;
  }
  return html;
}
function renderAngleCode(vertex,p1,p2,group,color){
  color = color || CODE_GROUP_COLORS[group] || '#E35D3A';
  let html='';
  for(let i=0;i<group;i++){
    const {points} = angleArcPoints(vertex,p1,p2,13+i*5);
    html+=`<polyline points="${points}" fill="none" stroke="${color}" stroke-width="1.3"/>`;
  }
  return html;
}
function renderRightAngleCode(vertex,p1,p2){
  const a1=Math.atan2(p1.y-vertex.y,p1.x-vertex.x), a2=Math.atan2(p2.y-vertex.y,p2.x-vertex.x);
  const size=10;
  const c1={x:vertex.x+size*Math.cos(a1), y:vertex.y+size*Math.sin(a1)};
  const c2={x:vertex.x+size*Math.cos(a2), y:vertex.y+size*Math.sin(a2)};
  const c3={x:c1.x+c2.x-vertex.x, y:c1.y+c2.y-vertex.y};
  return `<polyline points="${c1.x},${c1.y} ${c3.x},${c3.y} ${c2.x},${c2.y}" fill="none" stroke="#E35D3A" stroke-width="1.3"/>`;
}
/* Codage d'un côté par SYMBOLE (pas seulement par couleur) : 1 trait, 2 traits, petit cercle,
   ou # -- quatre conventions différentes qu'on peut cycler pour ne jamais confondre deux côtés,
   même pour un daltonien qui ne distinguerait pas les couleurs. */
function renderSideCode(p1,p2,styleIdx,color){
  const style = ((styleIdx%4)+4)%4;
  const mid={x:(p1.x+p2.x)/2, y:(p1.y+p2.y)/2};
  if(style===0) return renderLengthCode(p1,p2,1,color);
  if(style===1) return renderLengthCode(p1,p2,2,color);
  if(style===2) return `<circle cx="${mid.x}" cy="${mid.y}" r="4" fill="none" stroke="${color}" stroke-width="1.1"/>`;
  return `<text x="${mid.x}" y="${mid.y+4}" font-family="JetBrains Mono" font-size="12" font-weight="700" fill="${color}" text-anchor="middle">#</text>`;
}
/* Les angles utilisent un vocabulaire de symboles totalement différent de celui des côtés
   (carré / losange au lieu de cercle / #) : un même symbole ne peut donc jamais désigner
   à la fois une longueur et un angle, même par coïncidence de cycle. */
/* Les angles restent toujours codés par des arcs (jamais par des cercles/carrés, qui sont réservés
   aux côtés) : le nombre d'arcs, leur couleur, et pour aller plus loin un petit trait qui vient
   intercepter le ou les arcs -- convention géométrique standard. */
function renderVertexCode(vertex,p1,p2,styleIdx,color){
  const style = ((styleIdx%4)+4)%4;
  const arcCount = (style===0||style===2) ? 1 : 2;
  let html = renderAngleCode(vertex,p1,p2,arcCount,color);
  if(style===2 || style===3){
    const a1=Math.atan2(p1.y-vertex.y,p1.x-vertex.x);
    let a2=Math.atan2(p2.y-vertex.y,p2.x-vertex.x);
    let delta=a2-a1; while(delta>Math.PI) delta-=2*Math.PI; while(delta<-Math.PI) delta+=2*Math.PI;
    const bis=a1+delta/2;
    const rInner=13, rOuter=arcCount===1?13:18;
    const x1=vertex.x+(rInner-5)*Math.cos(bis), y1=vertex.y+(rInner-5)*Math.sin(bis);
    const x2=vertex.x+(rOuter+5)*Math.cos(bis), y2=vertex.y+(rOuter+5)*Math.sin(bis);
    html += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.1"/>`;
  }
  return html;
}
/* Attributs de trait (couleur, épaisseur, pointillé) d'une forme, en tenant compte du style
   choisi via l'éditeur de style (mode Déplacer) -- retombe sur la couleur/épaisseur par
   défaut de son type si aucun style personnalisé n'a été choisi. */
function shapeStrokeAttrs(s, defaultColor){
  const color = s.strokeColor || defaultColor;
  const sw = s.strokeWidth==='epais' ? 1.8 : 1.1;
  const dash = s.strokePattern==='pointille' ? ' stroke-dasharray="5,4"' : '';
  return `stroke="${color}" stroke-width="${sw}"${dash}`;
}
function renderFigureSvg(){
  const svg=document.getElementById('figureSvg');
  let html='';
  if(figState.refShape){
    html+=`<line x1="${figState.refShape.p1.x}" y1="${figState.refShape.p1.y}" x2="${figState.refShape.p2.x}" y2="${figState.refShape.p2.y}" stroke="#E35D3A" stroke-width="4" stroke-opacity=".35"/>`;
  }
  figState.shapes.forEach(s=>{
    if(s.type==='segment'){
      html+=`<line x1="${s.p1.x}" y1="${s.p1.y}" x2="${s.p2.x}" y2="${s.p2.y}" ${shapeStrokeAttrs(s,'#1C1B2E')}/>`;
      if(s.lengthLabel){
        const mx=(s.p1.x+s.p2.x)/2, my=(s.p1.y+s.p2.y)/2;
        html+=`<text x="${mx}" y="${my-9}" font-family="JetBrains Mono" font-size="11" fill="#5C5A78" text-anchor="middle">${s.lengthLabel}</text>`;
      }
      if(s.codeGroup) html += renderLengthCode(s.p1, s.p2, s.codeGroup);
    } else if(s.type==='vecteur'){
      const dx=s.p2.x-s.p1.x, dy=s.p2.y-s.p1.y, len=Math.hypot(dx,dy)||1;
      const ux=dx/len, uy=dy/len, nx=-uy, ny=ux, headLen=9, headW=4;
      const bx=s.p2.x-ux*headLen, by=s.p2.y-uy*headLen;
      html+=`<line x1="${s.p1.x}" y1="${s.p1.y}" x2="${bx}" y2="${by}" ${shapeStrokeAttrs(s,'#1C1B2E')}/>`;
      const attrs = shapeStrokeAttrs(s,'#1C1B2E');
      const col = (attrs.match(/stroke="([^"]+)"/)||[])[1] || '#1C1B2E';
      html+=`<polygon points="${s.p2.x},${s.p2.y} ${(bx+nx*headW).toFixed(1)},${(by+ny*headW).toFixed(1)} ${(bx-nx*headW).toFixed(1)},${(by-ny*headW).toFixed(1)}" fill="${col}"/>`;
    } else if(s.type==='droite'){
      const dx=s.p2.x-s.p1.x, dy=s.p2.y-s.p1.y; const len=Math.hypot(dx,dy)||1; const ext=400;
      html+=`<line x1="${s.p1.x-dx/len*ext}" y1="${s.p1.y-dy/len*ext}" x2="${s.p2.x+dx/len*ext}" y2="${s.p2.y+dy/len*ext}" ${shapeStrokeAttrs(s,'#1C1B2E')}/>`;
    } else if(s.type==='demi-droite'){
      // Part exactement de p1 (l'origine du rayon, aucune extension de ce côté) et va loin
      // au-delà de p2, dans cette même direction.
      const dx=s.p2.x-s.p1.x, dy=s.p2.y-s.p1.y; const len=Math.hypot(dx,dy)||1; const ext=400;
      html+=`<line x1="${s.p1.x}" y1="${s.p1.y}" x2="${s.p2.x+dx/len*ext}" y2="${s.p2.y+dy/len*ext}" ${shapeStrokeAttrs(s,'#1C1B2E')}/>`;
    } else if(s.type==='cercle'){
      const hasFixedRadius = s.radius!=null;
      const r = hasFixedRadius ? s.radius : Math.hypot(s.p2.x-s.p1.x, s.p2.y-s.p1.y);
      const refPoint = hasFixedRadius ? {x:s.p1.x+r*Math.cos(s.angle||0), y:s.p1.y+r*Math.sin(s.angle||0)} : s.p2;
      html+=`<circle cx="${s.p1.x}" cy="${s.p1.y}" r="${r}" fill="none" ${shapeStrokeAttrs(s,'#1F3A5C')}/>`;
      if(s.compass) html += compassGraphic(s.p1, refPoint);
      if(s.radiusLabel) html+=`<text x="${s.p1.x+(refPoint.x-s.p1.x)/2}" y="${s.p1.y+(refPoint.y-s.p1.y)/2-8}" font-family="JetBrains Mono" font-size="11" fill="#5C5A78" text-anchor="middle">${s.radiusLabel}</text>`;
      if(s.codeGroup){
        // Le codage (traits perpendiculaires) se rapporte au rayon -- sans tracer ce rayon
        // lui-même, les traits apparaîtraient flottants, sans aucune ligne visible reliant le
        // centre au bord du cercle.
        html += `<line x1="${s.p1.x}" y1="${s.p1.y}" x2="${refPoint.x}" y2="${refPoint.y}" stroke="#5C5A78" stroke-width="1"/>`;
        html += renderLengthCode(s.p1, refPoint, s.codeGroup);
      }
    } else if(s.type==='arc'){
      const r=Math.hypot(s.p1.x-s.center.x, s.p1.y-s.center.y);
      const {points} = angleArcPoints(s.center, s.p1, s.p2, r);
      html+=`<polyline points="${points}" fill="none" ${shapeStrokeAttrs(s,'#1F3A5C')}/>`;
      if(s.compass) html += compassGraphic(s.center, s.p1);
    } else if(s.type==='angle' || s.type==='bissectrice'){
      const r=26;
      const {points,mid}=angleArcPoints(s.vertex,s.p1,s.p2,r);
      const color = s.type==='angle' ? '#E35D3A' : '#8A2F52';
      html+=`<polyline points="${points}" fill="none" stroke="${color}" stroke-width="1.8"/>`;
      if(s.type==='angle'){
        const lx=s.vertex.x+(r+14)*Math.cos(mid), ly=s.vertex.y+(r+14)*Math.sin(mid);
        html+=`<text x="${lx}" y="${ly}" font-family="JetBrains Mono" font-size="12" fill="${color}" text-anchor="middle">${angleDegrees(s.vertex,s.p1,s.p2)}°</text>`;
      } else {
        const a1=Math.atan2(s.p1.y-s.vertex.y, s.p1.x-s.vertex.x);
        let a2=Math.atan2(s.p2.y-s.vertex.y, s.p2.x-s.vertex.x);
        let delta=a2-a1; while(delta>Math.PI) delta-=2*Math.PI; while(delta<-Math.PI) delta+=2*Math.PI;
        const bisA=a1+delta/2, len=260;
        html+=`<line x1="${s.vertex.x}" y1="${s.vertex.y}" x2="${s.vertex.x+len*Math.cos(bisA)}" y2="${s.vertex.y+len*Math.sin(bisA)}" stroke="${color}" stroke-width="1.6" stroke-dasharray="2 3"/>`;
      }
    } else if(s.type==='perpendiculaire' || s.type==='parallele'){
      let dx=s.refB.x-s.refA.x, dy=s.refB.y-s.refA.y;
      if(s.type==='perpendiculaire'){ const t=dx; dx=-dy; dy=t; }
      const len=Math.hypot(dx,dy)||1; const ext=400;
      const defaultColor = s.type==='perpendiculaire' ? '#2C5A2E' : '#1F3A5C';
      html+=`<line x1="${s.through.x-dx/len*ext}" y1="${s.through.y-dy/len*ext}" x2="${s.through.x+dx/len*ext}" y2="${s.through.y+dy/len*ext}" ${shapeStrokeAttrs(s,defaultColor)}/>`;
    } else if(s.type==='mediatrice'){
      const mid={x:(s.p1.x+s.p2.x)/2, y:(s.p1.y+s.p2.y)/2};
      const dx=-(s.p2.y-s.p1.y), dy=(s.p2.x-s.p1.x);
      const len=Math.hypot(dx,dy)||1; const ext=400;
      // Pointillé par convention TANT QU'aucun choix explicite n'a été fait via la modale de
      // style -- un choix "Plein" est désormais bien respecté (signalé : "je n'ai pas réussi
      // à changer malgré la fenêtre modale").
      const attrs = s.strokePattern ? shapeStrokeAttrs(s,'#2C5A2E') : `${shapeStrokeAttrs(s,'#2C5A2E')} stroke-dasharray="6 4"`;
      html+=`<line x1="${mid.x-dx/len*ext}" y1="${mid.y-dy/len*ext}" x2="${mid.x+dx/len*ext}" y2="${mid.y+dy/len*ext}" ${attrs}/>`;
    } else if(s.type==='mesure-distance'){
      const dx=s.p2.x-s.p1.x, dy=s.p2.y-s.p1.y, len=Math.hypot(dx,dy)||1;
      const angleDeg = Math.atan2(dy,dx)*180/Math.PI;
      const {x:lx,y:ly} = measureLabelPos(s);
      const cmVal = len/SCALE_PX_PER_CM;
      const cm = (Math.round(cmVal*100)/100).toString().replace(/\.?0+$/,'')||'0';
      // Garde le texte "à l'endroit" (jamais retourné à l'envers) tout en restant parallèle.
      let textAngle = angleDeg;
      if(textAngle>90 || textAngle<-90) textAngle += 180;
      html += `<line x1="${s.p1.x}" y1="${s.p1.y}" x2="${s.p2.x}" y2="${s.p2.y}" ${shapeStrokeAttrs(s,'#8A2F52')} stroke-dasharray="4,3"/>`;
      html += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-family="JetBrains Mono" font-size="12" fill="${s.strokeColor||'#8A2F52'}" text-anchor="middle" transform="rotate(${textAngle.toFixed(1)} ${lx.toFixed(1)} ${ly.toFixed(1)})">${cm} cm</text>`;
    } else if(s.type==='code-longueur'){
      html += renderLengthCode(s.p1,s.p2,s.group||1);
    } else if(s.type==='code-angle'){
      html += renderAngleCode(s.vertex,s.p1,s.p2,s.group||1);
    } else if(s.type==='code-droit'){
      html += renderRightAngleCode(s.vertex,s.p1,s.p2);
    } else if(s.type==='angle-value'){
      // Texte de la mesure de l'angle, placé le long de sa bissectrice (indépendant du
      // codage, qui est un type de forme séparé -- les deux peuvent coexister ou non).
      const a1 = Math.atan2(s.p1.y-s.vertex.y, s.p1.x-s.vertex.x);
      let a2 = Math.atan2(s.p2.y-s.vertex.y, s.p2.x-s.vertex.x);
      let delta = a2-a1; while(delta>Math.PI) delta-=2*Math.PI; while(delta<-Math.PI) delta+=2*Math.PI;
      const bis = a1+delta/2;
      const r = 30;
      const lx = s.vertex.x+r*Math.cos(bis), ly = s.vertex.y+r*Math.sin(bis);
      html += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-family="JetBrains Mono" font-size="11" fill="#5C5A78" text-anchor="middle">${s.deg}°</text>`;
    }
  });
  /* Marqueur d'un point selon le nombre d'objets (segment/droite/demi-droite comme
     extrémité, angle/bissectrice comme sommet) auxquels il appartient :
     - 0 objet : point "libre", marqué d'une croix.
     - 1 objet, ou 2+ objets tous ALIGNÉS (même droite, comme un milieu qui sépare un
       segment en deux) : petit trait perpendiculaire -- sans lui, rien ne montre la
       position du point sur une ligne droite.
     - 2+ objets qui ne sont PAS tous alignés (un vrai coin, ex. un sommet de triangle) :
       rien du tout -- le coin lui-même montre déjà où est le point, un marqueur en plus
       ferait double emploi et surchargerait la figure. */
  function findLineShapesAt(pt){
    return figState.shapes.filter(s=>
      (['segment','droite','demi-droite','vecteur'].includes(s.type) && (s.p1===pt || s.p2===pt)) ||
      (['angle','bissectrice'].includes(s.type) && (s.vertex===pt || s.p1===pt || s.p2===pt))
    );
  }
  function shapeDirAt(s, pt){
    let from;
    if(s.vertex){
      // Angle/bissectrice : p1 et p2 ne sont reliés au sommet QUE par le sommet lui-même --
      // il n'existe aucune droite p1<->p2 directe. La seule direction réelle depuis p1 ou p2
      // est donc vers le sommet, jamais vers l'autre point.
      from = (s.vertex===pt) ? s.p1 : s.vertex; // repli arbitraire si pt est le sommet lui-même (il a de toute façon 2 côtés, donc pas de direction unique -- geste sans incidence ici)
    } else {
      from = (s.p1===pt) ? s.p2 : s.p1;
    }
    const dx=from.x-pt.x, dy=from.y-pt.y, len=Math.hypot(dx,dy)||1;
    return {x:dx/len, y:dy/len};
  }
  figState.points.forEach(p=>{
    const sel = figState.selected.includes(p);
    const linked = findLineShapesAt(p);
    // Si le point est lié à une forme dont la couleur a été personnalisée (via l'éditeur de
    // style), son marqueur ET son label reprennent cette couleur -- changer la couleur d'un
    // segment doit aussi changer la couleur de ses extrémités, pas seulement le trait.
    const styledShape = linked.find(s=>s.strokeColor);
    // Gris = point dépendant qu'on NE PEUT PAS déplacer directement (milieu, transformations,
    // intersection) ; vert = point dépendant mais AMOVIBLE le long de son objet (point sur
    // segment/droite/demi-droite/cercle).
    const isMovableDependent = p.def && (p.def.type==='point-sur-droite' || p.def.type==='point-sur-cercle');
    const defaultColor = isMovableDependent ? '#1F7A4D' : (p.def ? '#7A8A98' : '#1C1B2E');
    const baseColor = styledShape ? styledShape.strokeColor : defaultColor;
    const c = sel?'#E35D3A':baseColor;
    if(p.def && p.def.type==='intersection'){
      // Un point d'intersection n'a besoin d'aucun marqueur -- le croisement des deux objets
      // le repère déjà visuellement, un marqueur en plus ferait double emploi.
    } else if(p.def && p.def.type==='point-sur-droite'){
      // Trait perpendiculaire à l'objet sur lequel le point est posé -- lineShapeEndpoints
      // donne la VRAIE direction de l'objet (pour une médiatrice, shape.p1/p2 sont les points
      // du segment ORIGINAL, pas de la médiatrice ; les utiliser directement donnait à tort
      // un trait parallèle à la médiatrice au lieu de perpendiculaire).
      const {shape} = p.def;
      const {p1:lp1,p2:lp2} = lineShapeEndpoints(shape);
      const dx=lp2.x-lp1.x, dy=lp2.y-lp1.y, len=Math.hypot(dx,dy)||1;
      const nx=-dy/len, ny=dx/len;
      html+=`<line x1="${(p.x-nx*5).toFixed(1)}" y1="${(p.y-ny*5).toFixed(1)}" x2="${(p.x+nx*5).toFixed(1)}" y2="${(p.y+ny*5).toFixed(1)}" stroke="${c}" stroke-width="1.6"/>`;
    } else if(p.def && p.def.type==='point-sur-cercle'){
      // Trait perpendiculaire à la TANGENTE du cercle en ce point -- donc le long du rayon
      // (direction centre -> point).
      const {shape} = p.def;
      const dx=p.x-shape.p1.x, dy=p.y-shape.p1.y, len=Math.hypot(dx,dy)||1;
      const nx=dx/len, ny=dy/len;
      html+=`<line x1="${(p.x-nx*5).toFixed(1)}" y1="${(p.y-ny*5).toFixed(1)}" x2="${(p.x+nx*5).toFixed(1)}" y2="${(p.y+ny*5).toFixed(1)}" stroke="${c}" stroke-width="1.6"/>`;
    } else {
    let allAligned = linked.length>=1;
    if(linked.length>=2){
      const dir0 = shapeDirAt(linked[0], p);
      allAligned = linked.every(s=>{
        const d = shapeDirAt(s, p);
        const cross = Math.abs(dir0.x*d.y - dir0.y*d.x); // ~0 si colinéaire (même droite, quel que soit le sens)
        return cross < 0.02;
      });
    }
    if(linked.length===0){
      html+=`<line x1="${p.x-4}" y1="${p.y-4}" x2="${p.x+4}" y2="${p.y+4}" stroke="${c}" stroke-width="1.6"/>`;
      html+=`<line x1="${p.x-4}" y1="${p.y+4}" x2="${p.x+4}" y2="${p.y-4}" stroke="${c}" stroke-width="1.6"/>`;
    } else if(linked.length===1 && linked[0].type==='vecteur' && linked[0].p2===p){
      // Pointe d'un vecteur : la flèche montre déjà où est ce point, un trait en plus ferait
      // double emploi (signalé : "la flèche remplace le point, ne pas faire les deux").
    } else if(allAligned){
      const dir = shapeDirAt(linked[0], p);
      const nx=-dir.y, ny=dir.x;
      html+=`<line x1="${(p.x-nx*5).toFixed(1)}" y1="${(p.y-ny*5).toFixed(1)}" x2="${(p.x+nx*5).toFixed(1)}" y2="${(p.y+ny*5).toFixed(1)}" stroke="${c}" stroke-width="1.6"/>`;
    }
    }
    html+=`<text x="${p.x+(p.labelDx??9)}" y="${p.y+(p.labelDy??-9)}" font-family="Space Grotesk" font-size="14" font-weight="700" fill="${sel?'#E35D3A':baseColor}">${p.label}</text>`;
  });
  svg.innerHTML = html;
}

/* ---- construction à partir d'un énoncé (mini-langage reconnu) ---- */
function stripAccents(s){ return s.normalize('NFD').replace(/[\u0300-\u036f]/g,''); }
function quadCoords(kind){
  const cx=250, cy=160;
  if(kind==='carre') return [{x:cx-90,y:cy-90},{x:cx+90,y:cy-90},{x:cx+90,y:cy+90},{x:cx-90,y:cy+90}];
  if(kind==='rectangle') return [{x:cx-130,y:cy-70},{x:cx+130,y:cy-70},{x:cx+130,y:cy+70},{x:cx-130,y:cy+70}];
  if(kind==='losange') return [{x:cx,y:cy-100},{x:cx+120,y:cy},{x:cx,y:cy+100},{x:cx-120,y:cy}];
  return [{x:cx-120,y:cy-70},{x:cx+80,y:cy-70},{x:cx+120,y:cy+70},{x:cx-80,y:cy+70}]; // parallélogramme
}
function triangleCoords(kind, rightIdx){
  kind = kind || '';
  if(kind.includes('equilateral')){
    return [{x:250,y:70},{x:140.3,y:260},{x:359.7,y:260}];
  }
  if(kind.includes('rectangle')){
    const base=[{x:150,y:250},{x:350,y:250},{x:150,y:90}]; // angle droit sur base[0]
    const idx = (typeof rightIdx==='number') ? rightIdx : 0;
    const out=[null,null,null];
    out[idx]=base[0]; out[(idx+1)%3]=base[1]; out[(idx+2)%3]=base[2];
    return out;
  }
  if(kind.includes('isocele')){
    return [{x:250,y:70},{x:130,y:260},{x:370,y:260}];
  }
  return [{x:250,y:70},{x:120,y:260},{x:380,y:260}]; // scalène par défaut
}
function figByLabel(map, lab){ return map[lab]; }
function buildFromEnonce(){
  const text = document.getElementById('enonceInput').value;
  const byLabel = {};
  figState.points.forEach(p=>{ byLabel[p.label]=p; });
  let unresolved = [];
  text.split('\n').forEach(raw=>{
    const line = raw.trim();
    if(!line) return;
    let m;
    if((m = line.match(/^([A-Za-z]{4})\s+(carr[ée]|rectangle|losange|parall[ée]logramme)/i))){
      const labels = m[1].toUpperCase().split('');
      const kind = stripAccents(m[2].toLowerCase());
      const coords = quadCoords(kind.startsWith('carr')?'carre':kind);
      labels.forEach((lab,i)=>{ byLabel[lab]=byLabel[lab]||{label:lab}; Object.assign(byLabel[lab],coords[i]); });
      for(let i=0;i<4;i++) figState.shapes.push({type:'segment', p1:byLabel[labels[i]], p2:byLabel[labels[(i+1)%4]]});
    }
    else if((m = line.match(/^([A-Za-z]{3})\s+triangle((?:\s+(?:rectangle|isoc[eè]le|[ée]quilat[ée]ral))*)(?:\s+en\s+([A-Za-z]))?/i))){
      const labels = m[1].toUpperCase().split('');
      const kind = stripAccents((m[2]||'').toLowerCase());
      const rightVertex = m[3] ? m[3].toUpperCase() : null;
      const rightIdx = rightVertex ? labels.indexOf(rightVertex) : 0;
      const coords = triangleCoords(kind, rightIdx>=0?rightIdx:0);
      labels.forEach((lab,i)=>{ byLabel[lab]=byLabel[lab]||{label:lab}; Object.assign(byLabel[lab],coords[i]); });
      for(let i=0;i<3;i++) figState.shapes.push({type:'segment', p1:byLabel[labels[i]], p2:byLabel[labels[(i+1)%3]]});
    }
    else if((m = line.match(/^([A-Za-z])\s+milieu\s+de\s*\[?([A-Za-z])([A-Za-z])\]?/i))){
      const lab=m[1].toUpperCase(), l1=m[2].toUpperCase(), l2=m[3].toUpperCase();
      const p1=byLabel[l1], p2=byLabel[l2];
      if(p1 && p2){ byLabel[lab]=byLabel[lab]||{label:lab}; Object.assign(byLabel[lab], {x:(p1.x+p2.x)/2, y:(p1.y+p2.y)/2, def:{type:'milieu', a:p1, b:p2}}); }
      else unresolved.push(line);
    }
    else if((m = line.match(/^cercle\s+de\s+centre\s+([A-Za-z])(?:\s+passant\s+par\s+([A-Za-z])|\s+(?:et\s+)?de\s+rayon)/i))){
      const cLab=m[1].toUpperCase(), tLab=m[2]?m[2].toUpperCase():null;
      const center = byLabel[cLab];
      if(center){
        const radiusPoint = tLab ? byLabel[tLab] : {x:center.x+80, y:center.y};
        if(radiusPoint) figState.shapes.push({type:'cercle', p1:center, p2:radiusPoint});
      } else unresolved.push(line);
    }
    else if((m = line.match(/^([A-Za-z])\s*(?:point)?$/i))){
      const lab = m[1].toUpperCase();
      if(!byLabel[lab]) byLabel[lab] = {label:lab, x:60+Math.random()*380, y:50+Math.random()*220};
    }
    else unresolved.push(line);
  });
  figState.points = Object.values(byLabel);
  recomputeDependents();
  renderFigureSvg();
  const hint = document.getElementById('figureHint');
  hint.textContent = unresolved.length
    ? `Construit, mais non reconnu : « ${unresolved.join(' / ')} ». Ajustez à la main, ou essayez « Interpréter avec l'IA ».`
    : 'Construction faite, ajustez à la main si besoin, ou validez.';
}
function figurePrompt(text){
  return `Tu convertis un énoncé de géométrie de collège (6e/5e) en une figure décrite en JSON strict, rien d'autre autour (pas de \`\`\`, pas de texte).
Schéma exact attendu :
{"points":[{"label":"A","x":150,"y":80}, ...],
 "shapes":[{"type":"segment","p1":"A","p2":"B"}, {"type":"droite","p1":"A","p2":"B"}, {"type":"cercle","p1":"A","p2":"B"}, {"type":"angle","vertex":"B","p1":"A","p2":"C"}]}
Contraintes : coordonnées x entre 20 et 480, y entre 20 et 300, dans un repère où y augmente vers le bas. Respecte la géométrie réelle décrite (angles droits, longueurs égales, alignements, milieux...) du mieux possible avec des coordonnées cohérentes. "p1"/"p2"/"vertex" référencent des labels déclarés dans "points". N'invente pas de figure si l'énoncé est incompréhensible : renvoie {"points":[],"shapes":[]} dans ce cas.
Énoncé : """${text}"""`;
}
async function interpretEnonceWithAI(){
  const hint = document.getElementById('figureHint');
  const text = document.getElementById('enonceInput').value.trim();
  if(!text){ hint.textContent = "Tapez d'abord un énoncé dans le champ ci-dessus."; return; }
  if(!currentUser){ hint.textContent = "Connectez-vous pour utiliser l'interprétation par IA."; return; }
  hint.textContent = "Interprétation par l'IA en cours…";
  try{
    const raw = await callClaude(figurePrompt(text), 900, {feature:'figure', chapitre:currentChapterTitle});
    const match = raw.match(/\{[\s\S]*\}/);
    if(!match) throw new Error('no-json');
    const json = JSON.parse(match[0]);
    applyAIFigure(json);
    hint.textContent = "Figure interprétée par l'IA, vérifiez et ajustez si besoin, ou validez.";
  }catch(err){
    if(err.message==='no-session') hint.textContent = "Connectez-vous pour utiliser l'interprétation par IA.";
    else hint.textContent = "Échec de l'interprétation IA (réseau, ou réponse inattendue). Réessayez, ou construisez à la main.";
  }
}
function applyAIFigure(json){
  const byLabel = {};
  (json.points||[]).forEach(p=>{
    if(p && p.label) byLabel[String(p.label).toUpperCase()] = {label:String(p.label).toUpperCase(), x:+p.x||250, y:+p.y||160};
  });
  const shapes = [];
  (json.shapes||[]).forEach(s=>{
    if(!s || !s.type) return;
    if(s.type==='angle'){
      const v=byLabel[String(s.vertex).toUpperCase()], p1=byLabel[String(s.p1).toUpperCase()], p2=byLabel[String(s.p2).toUpperCase()];
      if(v&&p1&&p2) shapes.push({type:'angle', vertex:v, p1, p2});
    } else if(['segment','droite','cercle'].includes(s.type)){
      const p1=byLabel[String(s.p1).toUpperCase()], p2=byLabel[String(s.p2).toUpperCase()];
      if(p1&&p2) shapes.push({type:s.type, p1, p2});
    }
  });
  if(!Object.keys(byLabel).length) return;
  figState.points = Object.values(byLabel);
  figState.shapes = shapes;
  figState.nextLabel = 0;
  renderFigureSvg();
}
function validateFigure(){
  const svg=document.getElementById('figureSvg');
  // Pas de max-width ici : le SVG remplit 100% de son conteneur (.resizable-block), dont la
  // largeur par défaut est calibrée précisément en app.js (singleBlockHTML, defaultWidth)
  // pour que les longueurs déclarées dans cet outil correspondent à de vrais centimètres une
  // fois imprimées -- un max-width codé en dur ici primerait sur cette largeur et annulerait
  // le calibrage (c'était le cas avant : 420px fixe, sans lien avec l'échelle réelle de la
  // page imprimée).
  const html = `<svg viewBox="0 0 500 320" style="width:100%;display:block;margin:6px auto;border:1px solid rgba(28,43,57,.12);border-radius:8px;">${svg.innerHTML}</svg>`;
  const snapshot = JSON.parse(JSON.stringify({points:figState.points, shapes:figState.shapes}));
  addPendingBlock('figure', html, snapshot, 'reopenFigure');
  closeFigureTool();
}
function reopenFigure(data){
  openFigureTool();
  figState.points = JSON.parse(JSON.stringify(data.points));
  figState.shapes = JSON.parse(JSON.stringify(data.shapes));
  figState.nextLabel = figState.points.length;
  renderFigureSvg();
}
(function initFigureDrag(){
  const attach = ()=>{
    const svg = document.getElementById('figureSvg');
    if(!svg) return;
    svg.addEventListener('mousedown', onFigureMouseDown);
    svg.addEventListener('dblclick', onFigureDblClick);
    window.addEventListener('mousemove', onFigureMouseMove);
    window.addEventListener('mouseup', onFigureMouseUp);
    svg.addEventListener('touchstart', onFigureMouseDown, {passive:false});
    svg.addEventListener('touchmove', onFigureMouseMove, {passive:false});
    svg.addEventListener('touchend', onFigureMouseUp);
  };
  attach();
})();
