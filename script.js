// Données Pokémon
const pokemonData = {
    Bulbasaur: {
        name: "Bulbasaur",
        level: 5,
        type: "Grass",
        maxHealth: 150,
        health: 150,
        attack: 49,
        defense: 49,
        speed: 45,
        moves: [
            { name: "Tackle", type: "Normal", damage: 35 },
            { name: "Vine Whip", type: "Grass", damage: 45 },
            { name: "Razor Leaf", type: "Grass", damage: 55 },
            { name: "Growl", type: "Normal", damage: 0, effect: "debuffAttack" } // Exemple d'attaque de débuff
        ],
        spriteUrl: "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif" // Sprite animé normal
    },
    Charmander: {
        name: "Charmander",
        level: 5,
        type: "Fire",
        maxHealth: 140,
        health: 140,
        attack: 52,
        defense: 43,
        speed: 65,
        moves: [
            { name: "Scratch", type: "Normal", damage: 40 },
            { name: "Ember", type: "Fire", damage: 40 },
            { name: "Flame Burst", type: "Fire", damage: 70 },
            { name: "Smokescreen", type: "Normal", damage: 0, effect: "debuffAccuracy" } // Exemple d'attaque de débuff
        ],
        spriteUrl: "https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif" // Sprite animé normal
    },
    Squirtle: {
        name: "Squirtle",
        level: 5,
        type: "Water",
        maxHealth: 160,
        health: 160,
        attack: 48,
        defense: 65,
        speed: 43,
        moves: [
            { name: "Tackle", type: "Normal", damage: 35 },
            { name: "Water Gun", type: "Water", damage: 40 },
            { name: "Water Pulse", type: "Water", damage: 60 },
            { name: "Withdraw", type: "Water", damage: 0, effect: "buffDefense" } // Exemple d'attaque de buff
        ],
        spriteUrl: "https://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif" // Sprite animé normal
    },
    Pikachu: {
        name: "Pikachu",
        level: 7, // Niveau ennemi
        type: "Electric",
        maxHealth: 170, // Santé légèrement plus élevée en raison du niveau supérieur
        health: 170,
        attack: 55,
        defense: 40,
        speed: 90,
        moves: [
            { name: "Quick Attack", type: "Normal", damage: 40 },
            { name: "Thunder Shock", type: "Electric", damage: 40 },
            { name: "Thunderbolt", type: "Electric", damage: 90 },
            { name: "Tail Whip", type: "Normal", damage: 0, effect: "debuffDefense" } // Exemple d'attaque de débuff
        ],
        spriteUrl: "https://img.pokemondb.net/sprites/black-white/anim/normal/pikachu.gif" // Sprite animé normal
    },
    Eevee: {
        name: "Eevee",
        level: 7, // Niveau ennemi
        type: "Normal",
        maxHealth: 180, // Santé légèrement plus élevée en raison du niveau supérieur
        health: 180,
        attack: 55,
        defense: 50,
        speed: 55,
        moves: [
            { name: "Tackle", type: "Normal", damage: 35 },
            { name: "Quick Attack", type: "Normal", damage: 40 },
            { name: "Bite", type: "Dark", damage: 60 },
            { name: "Tail Whip", type: "Normal", damage: 0, effect: "debuffDefense" } // Exemple d'attaque de débuff
        ],
        spriteUrl: "https://img.pokemondb.net/sprites/black-white/anim/normal/eevee.gif" // Sprite animé normal
    },
    Snorlax: {
        name: "Snorlax",
        level: 7, // Niveau ennemi
        type: "Normal",
        maxHealth: 220, // Santé légèrement plus élevée en raison du niveau supérieur
        health: 220,
        attack: 110,
        defense: 65,
        speed: 30,
        moves: [
            { name: "Tackle", type: "Normal", damage: 35 },
            { name: "Body Slam", type: "Normal", damage: 85 },
            { name: "Rest", type: "Normal", damage: 0, effect: "heal" }, // Exemple d'attaque de soin
            { name: "Defense Curl", type: "Normal", damage: 0, effect: "buffDefense" } // Exemple d'attaque de buff
        ],
        spriteUrl: "https://img.pokemondb.net/sprites/black-white/anim/normal/snorlax.gif" // Sprite animé normal
    }
};

// Types de Pokémon et efficacité
const typeEffectiveness = {
    "Normal": {},
    "Fire": { "Grass": 2, "Water": 0.5, "Fire": 0.5, "Rock": 0.5 },
    "Water": { "Fire": 2, "Water": 0.5, "Grass": 0.5, "Rock": 2 },
    "Grass": { "Water": 2, "Fire": 0.5, "Grass": 0.5, "Poison": 0.5, "Flying": 0.5, "Bug": 0.5 },
    "Electric": { "Water": 2, "Electric": 0.5, "Grass": 0.5, "Ground": 0 },
    "Ground": { "Fire": 2, "Electric": 2, "Grass": 0.5, "Poison": 2, "Flying": 0, "Bug": 0.5, "Rock": 2, "Steel": 2 },
    "Rock": { "Fire": 2, "Flying": 2, "Bug": 2, "Ice": 2, "Fighting": 0.5, "Ground": 0.5, "Steel": 0.5 },
    "Poison": { "Grass": 2, "Poison": 0.5, "Ground": 0.5, "Rock": 0.5, "Ghost": 0.5 },
    "Flying": { "Grass": 2, "Electric": 0.5, "Rock": 0.5, "Fighting": 2, "Bug": 2 },
    "Bug": { "Grass": 2, "Fire": 0.5, "Flying": 0.5, "Fighting": 0.5, "Poison": 0.5, "Ghost": 0.5, "Steel": 0.5, "Psychic": 2, "Dark": 2 },
    "Fighting": { "Normal": 2, "Flying": 0.5, "Poison": 0.5, "Rock": 2, "Bug": 0.5, "Ghost": 0, "Steel": 2, "Psychic": 0.5, "Ice": 2, "Dark": 2 },
    "Psychic": { "Fighting": 2, "Poison": 2, "Psychic": 0.5, "Steel": 0.5, "Dark": 0 },
    "Ghost": { "Normal": 0, "Psychic": 2, "Ghost": 2, "Dark": 0.5, "Steel": 0.5 },
    "Dark": { "Fighting": 0.5, "Psychic": 2, "Ghost": 2, "Dark": 0.5, "Steel": 0.5, "Fairy": 0.5 },
    "Steel": { "Fire": 0.5, "Water": 0.5, "Electric": 0.5, "Rock": 2, "Steel": 0.5, "Fairy": 2, "Ice": 2 },
    "Fairy": { "Fire": 0.5, "Fighting": 2, "Poison": 2, "Steel": 0.5, "Dark": 2, "Dragon": 0 }
};

let playerPokemon;
let enemyPokemon;
let currentPlayerPokemon; // Pokémon actuel du joueur au combat
let playerPokemonOptions; // Options de Pokémon du joueur
let battleActive = false; // Indique si une bataille est en cours

const battleLog = document.getElementById('battle-log');
const playerActionsDiv = document.getElementById('player-actions');
const pokemonSelectionDiv = document.getElementById('pokemon-selection');



// Fonction pour initialiser le jeu
function startGame() {
    // S'assurer que tous les éléments sont chargés
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeGame);
    } else {
        initializeGame();
    }
}

// Nouvelle fonction pour initialiser le jeu
function initializeGame() {
    playerPokemonOptions = ["Bulbasaur", "Charmander", "Squirtle"]; // Options de Pokémon du joueur
    enemyPokemon = createPokemon("Pikachu"); // L'ennemi est toujours Pikachu pour cet exemple
    selectPlayerPokemon(); // Permettre au joueur de choisir son Pokémon
}








// Fonction pour créer un objet Pokémon
function createPokemon(name) {
    const baseData = pokemonData[name];
    return {
        ...baseData,
        currentHealth: baseData.maxHealth, // Santé actuelle initialisée à la santé maximale
        attackStage: 0, // Étapes de buff/debuff d'attaque
        defenseStage: 0, // Étapes de buff/debuff de défense
        accuracyStage: 0, // Étapes de buff/debuff de précision
    };
}


// Fonction pour afficher les informations du Pokémon dans l'interface utilisateur
function displayPokemonInfo(pokemon, containerId, isPlayer = true) {
    document.getElementById(`${containerId}-name`).textContent = pokemon.name;
    document.getElementById(`${containerId}-level`).textContent = `Niveau ${pokemon.level}`;
    document.getElementById(`${containerId}-type`).textContent = `Type : ${pokemon.type}`;
    document.getElementById(`${containerId}-sprite`).src = pokemon.spriteUrl;

    updateHealthBar(pokemon, `${containerId}-health-bar`, `${containerId}-health-text`);
}

// Fonction pour mettre à jour la barre de santé
function updateHealthBar(pokemon, barId, textId) {
    const healthPercentage = (pokemon.currentHealth / pokemon.maxHealth) * 100;
    document.getElementById(barId).style.width = `${healthPercentage}%`;
    document.getElementById(textId).textContent = `${pokemon.currentHealth}/${pokemon.maxHealth}`;

    // Changer la couleur de la barre de santé en fonction de la santé
    if (healthPercentage > 50) {
        document.getElementById(barId).style.backgroundColor = 'green';
    } else if (healthPercentage > 20) {
        document.getElementById(barId).style.backgroundColor = 'yellow';
    } else {
        document.getElementById(barId).style.backgroundColor = 'red';
    }
}

// Fonction pour afficher les messages dans le journal de combat
function logMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    battleLog.appendChild(messageElement);
    battleLog.scrollTop = battleLog.scrollHeight; // Défilement automatique vers le bas
}

// Fonction pour calculer les dégâts
function calculateDamage(attacker, defender, move) {
    let effectiveness = typeEffectiveness[move.type]?.[defender.type] || 1; // Multiplicateur d'efficacité du type
    let damage = move.damage;

    // Calcul des dégâts basé sur le niveau et les stats (simplifié)
    let levelFactor = (attacker.level / defender.level);
    damage = damage * levelFactor;

    // Application de l'efficacité du type
    damage = damage * effectiveness;

    // Randomisation légère des dégâts pour plus de variété
    const randomFactor = 0.85 + Math.random() * 0.15; // Randomisation entre 85 % et 100 %
    damage = Math.round(damage * randomFactor);

    // Assurer un minimum de dégâts
    damage = Math.max(1, damage);

    return damage;
}


// Fonction pour gérer l'attaque
function handleAttack(move) {
    if (!battleActive) return;

    logMessage(`${currentPlayerPokemon.name} utilise ${move.name} !`);

    let damage = calculateDamage(currentPlayerPokemon, enemyPokemon, move);
    let effectiveness = typeEffectiveness[move.type]?.[enemyPokemon.type] || 1;
    let effectivenessMessage = "";
    if (effectiveness > 1) effectivenessMessage = "C'est super efficace !";
    if (effectiveness < 1 && effectiveness > 0) effectivenessMessage = "Ce n'est pas très efficace...";
    if (effectiveness === 0) effectivenessMessage = "Cela n'a aucun effet sur l'ennemi !";
    if (effectivenessMessage) logMessage(effectivenessMessage);


    enemyPokemon.currentHealth -= damage;
    if (enemyPokemon.currentHealth < 0) enemyPokemon.currentHealth = 0; // Empêcher la santé de devenir négative
    updateHealthBar(enemyPokemon, 'enemy-health-bar', 'enemy-health-text');
    logMessage(`${enemyPokemon.name} perd ${damage} PV !`);

    // Gérer les effets de mouvement (buffs, debuffs, etc.)
    if (move.effect) {
        applyMoveEffect(currentPlayerPokemon, enemyPokemon, move.effect, "player");
    }

    if (enemyPokemon.currentHealth <= 0) {
        endBattle(`${currentPlayerPokemon.name} gagne !`);
        return;
    }

    // Tour de l'ennemi après l'attaque du joueur
    enemyTurn();
}

// Fonction pour appliquer les effets de mouvement
function applyMoveEffect(attacker, defender, effectName, userType) {
    switch (effectName) {
        case "debuffAttack":
            if (defender.attackStage > -6) {
                defender.attackStage--;
                logMessage(`${defender.name} a eu son Attaque diminuée !`);
            } else {
                logMessage(`L'Attaque de ${defender.name} ne peut pas baisser davantage !`);
            }
            break;
        case "debuffDefense":
            if (defender.defenseStage > -6) {
                defender.defenseStage--;
                logMessage(`${defender.name} a eu sa Défense diminuée !`);
            } else {
                logMessage(`La Défense de ${defender.name} ne peut pas baisser davantage !`);
            }
            break;
        case "debuffAccuracy":
            if (defender.accuracyStage > -6) {
                defender.accuracyStage--;
                logMessage(`${defender.name} a eu sa Précision diminuée !`);
            } else {
                logMessage(`La Précision de ${defender.name} ne peut pas baisser davantage !`);
            }
            break;
        case "buffDefense":
            if (attacker.defenseStage < 6) {
                attacker.defenseStage++;
                logMessage(`${attacker.name} a vu sa Défense augmenter !`);
            } else {
                logMessage(`La Défense de ${attacker.name} ne peut pas augmenter davantage !`);
            }
            break;
        case "heal":
            const healAmount = Math.floor(attacker.maxHealth * 0.5); // Soigne de 50 % de la santé max
            attacker.currentHealth = Math.min(attacker.maxHealth, attacker.currentHealth + healAmount); // Ne pas dépasser la santé max
            updateHealthBar(attacker, `${userType}-pokemon-health-bar`, `${userType}-pokemon-health-text`);
            logMessage(`${attacker.name} se soigne et récupère ${healAmount} PV !`);
            break;
        // Ajouter d'autres effets ici
    }
}


// Fonction pour le tour de l'ennemi
function enemyTurn() {
    if (enemyPokemon.currentHealth <= 0 || !battleActive) return;

    logMessage(`C'est au tour de ${enemyPokemon.name} !`);

    // IA ennemi simple : choisit un mouvement aléatoire
    const randomMove = enemyPokemon.moves[Math.floor(Math.random() * enemyPokemon.moves.length)];
    logMessage(`${enemyPokemon.name} utilise ${randomMove.name} !`);

    let damage = calculateDamage(enemyPokemon, currentPlayerPokemon, randomMove);
    let effectiveness = typeEffectiveness[randomMove.type]?.[currentPlayerPokemon.type] || 1;
    let effectivenessMessage = "";
    if (effectiveness > 1) effectivenessMessage = "C'est super efficace !";
    if (effectiveness < 1 && effectiveness > 0) effectivenessMessage = "Ce n'est pas très efficace...";
    if (effectiveness === 0) effectivenessMessage = "Cela n'a aucun effet sur le joueur !";
    if (effectivenessMessage) logMessage(effectivenessMessage);

    currentPlayerPokemon.currentHealth -= damage;
    if (currentPlayerPokemon.currentHealth < 0) currentPlayerPokemon.currentHealth = 0;
    updateHealthBar(currentPlayerPokemon, 'player-health-bar', 'player-health-text');
    logMessage(`${currentPlayerPokemon.name} perd ${damage} PV !`);

    // Gérer les effets de mouvement de l'ennemi
    if (randomMove.effect) {
        applyMoveEffect(enemyPokemon, currentPlayerPokemon, randomMove.effect, "enemy"); // Notez que le type d'utilisateur est "ennemi"
    }


    if (currentPlayerPokemon.currentHealth <= 0) {
        logMessage(`${currentPlayerPokemon.name} est K.O. !`);
        // Vérifier s'il reste des Pokémon au joueur
        const remainingPokemon = playerPokemonOptions.filter(name => pokemonData[name].health > 0);
        if (remainingPokemon.length > 0) {
            // Si le joueur a d'autres Pokémon, lui permettre de changer
            logMessage("Vous devez changer de Pokémon !");
            showPokemonSelection(); // Afficher la sélection de Pokémon
        } else {
            // Si plus de Pokémon, l'ennemi gagne
            endBattle(`Vous n'avez plus de Pokémon capables de combattre ! ${enemyPokemon.name} gagne !`);
        }
        return; // Sortir pour empêcher les boutons d'action du joueur de réapparaître immédiatement
    }

    // Réafficher les boutons d'action du joueur après le tour de l'ennemi
    if (battleActive) { // Vérifier si la bataille est toujours active avant de réafficher les boutons
        displayPlayerActions();
    }
}


// Fonction pour afficher les boutons d'action du joueur (Attaque et Changer de Pokémon)
function displayPlayerActions() {
    playerActionsDiv.innerHTML = ''; // Effacer les boutons précédents

    // Boutons d'attaque
    currentPlayerPokemon.moves.forEach(move => {
        const moveButton = document.createElement('button');
        moveButton.textContent = move.name;
        moveButton.addEventListener('click', () => handleAttack(move));
        playerActionsDiv.appendChild(moveButton);
    });

    // Bouton Changer de Pokémon
    const switchButton = document.createElement('button');
    switchButton.textContent = 'Changer de Pokémon';
    switchButton.addEventListener('click', showPokemonSelection);
    playerActionsDiv.appendChild(switchButton);
}


// Fonction pour sélectionner le Pokémon du joueur au début du jeu
function selectPlayerPokemon() {
    pokemonSelectionDiv.innerHTML = ''; // Effacer les options précédentes
    pokemonSelectionDiv.style.display = 'flex'; // Afficher la sélection de Pokémon

    playerPokemonOptions.forEach(pokemonName => {
        const pokemonOptionButton = document.createElement('button');
        pokemonOptionButton.textContent = pokemonName;
        pokemonOptionButton.addEventListener('click', () => {
            currentPlayerPokemon = createPokemon(pokemonName);
            playerPokemon = currentPlayerPokemon; // Définir également playerPokemon
            displayPokemonInfo(currentPlayerPokemon, 'player-pokemon');
            displayPokemonInfo(enemyPokemon, 'enemy-pokemon', false); // false indique que c'est l'ennemi
            pokemonSelectionDiv.style.display = 'none'; // Masquer la sélection de Pokémon
            startBattle(); // Démarrer la bataille une fois le Pokémon sélectionné
        });
        pokemonSelectionDiv.appendChild(pokemonOptionButton);
    });
}

// Fonction pour afficher la sélection de Pokémon pendant la bataille
function showPokemonSelection() {
    pokemonSelectionDiv.innerHTML = ''; // Effacer les options précédentes
    pokemonSelectionDiv.style.display = 'flex'; // Afficher la sélection de Pokémon

    playerPokemonOptions.forEach(pokemonName => {
        // Ne pas permettre de choisir le Pokémon actuel
        if (pokemonName === currentPlayerPokemon.name) return;

        const pokemonOptionButton = document.createElement('button');
        pokemonOptionButton.textContent = `Changer pour ${pokemonName}`;
        pokemonOptionButton.addEventListener('click', () => {
            // Réinitialiser la santé de l'ancien Pokémon dans playerPokemonOptions
            pokemonData[currentPlayerPokemon.name].health = currentPlayerPokemon.currentHealth;

            currentPlayerPokemon = createPokemon(pokemonName); // Créer une nouvelle instance de Pokémon
            playerPokemon = currentPlayerPokemon; // Mettre à jour playerPokemon
            displayPokemonInfo(currentPlayerPokemon, 'player-pokemon');
            pokemonSelectionDiv.style.display = 'none'; // Masquer la sélection de Pokémon
            logMessage(`${playerPokemon.name}, je te choisis !`);
            displayPlayerActions(); // Réafficher les boutons d'action
        });
        pokemonSelectionDiv.appendChild(pokemonOptionButton);
    });

    // Bouton Annuler
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Annuler';
    cancelButton.addEventListener('click', () => {
        pokemonSelectionDiv.style.display = 'none'; // Masquer la sélection de Pokémon
        displayPlayerActions(); // Réafficher les boutons d'action
    });
    pokemonSelectionDiv.appendChild(cancelButton);
}


// Fonction pour démarrer la bataille
function startBattle() {
    battleActive = true;
    logMessage(`Début du combat entre ${currentPlayerPokemon.name} et ${enemyPokemon.name} !`);
    displayPlayerActions(); // Afficher les actions du joueur au début de la bataille
}

// Fonction pour terminer la bataille
function endBattle(message) {
    battleActive = false;
    logMessage("Combat terminé !");
    logMessage(message);
    playerActionsDiv.innerHTML = ''; // Effacer les boutons d'action
    pokemonSelectionDiv.innerHTML = ''; // Effacer la sélection de Pokémon
    pokemonSelectionDiv.style.display = 'none'; // S'assurer que la sélection de Pokémon est masquée

    // Bouton de redémarrage du jeu
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Rejouer';
    restartButton.addEventListener('click', restartGame);
    playerActionsDiv.appendChild(restartButton); // Utiliser playerActionsDiv pour le bouton de redémarrage
}

// Fonction pour redémarrer le jeu
function restartGame() {
    battleLog.innerHTML = ''; // Effacer le journal de combat
    playerPokemon = null;
    enemyPokemon = null;
    currentPlayerPokemon = null;
    playerPokemonOptions = null;
    battleActive = false;
    playerActionsDiv.innerHTML = ''; // Effacer les boutons d'action
    pokemonSelectionDiv.innerHTML = ''; // Effacer la sélection de Pokémon

    // Réinitialiser la santé des Pokémon dans pokemonData pour une nouvelle partie
    for (const pokemonName in pokemonData) {
        pokemonData[pokemonName].health = pokemonData[pokemonName].maxHealth;
    }

    startGame(); // Redémarrer le jeu
}


// Démarrer le jeu lorsque la page est chargée
window.onload = startGame;