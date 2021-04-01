export const adjs = ['Iron',
'Strong',
'Perfect',
'Hateful',
'Brave',
'Sneaky',
'Smart',
'Quick',
'Surreptitious',
'Gold',
'Plastic',
'Fast',
'Weak',
'Cruel',
'Jealous',
'Nice',
'Evil',
'Loving',
'Clever',
'Kind',
'Talented',
'Goofy',
'Slippery',
'Silly',
'Smelly',
'Snarky',
'Snobbish',
'Slimy',
'Swift',
'Slim',
'Silent',
'Short',
'Shifty',
'Snazzy',
'Insane',
'Invisible',
'Ghostly',
'Tacky',
'Fly',
'Flying',
'Floating',
'Angry',
'Tactical',
'Terrible',
'Lazy',
'Tarnished',
'The',
'Honest',
'Mad',
'Transient',
'Friendly',
'Mean',
'Squishy',
'Hardened',
'Soft',
'Cunning',
'Currosive',
'Cuddly',
'Weird',
'Thee',
'Elevated',
'Likeable',
'Stone',
'Loyal',
'Proper',
'Cloud',
'Impeccable',
'Lovely',
'Electric',
'Masked', 'lonely', 'Fuzzy', 'Feathered', 'Emotional', 'Musical', 'Glistening', 'Dank', 'Night', 'Lurid', 'Dark', 'Mortal', 'Smooth',
 'Sleeping', 'Unfound', 'Sugar', 'Salty'
];

export const nouns = ['Snake',
'Chef',
'Slicer',
'Snail',
'Stabber',
'Stinker',
'Stool',
'Steve',
'Skunk',
'Giant',
'Shell',
'Hulk',
'Seastar',
'Horror',
'Sea',
'Slapper',
'Knight',
'Paladin',
'Assassin',
'Barbarian',
'Mage',
'Dragon',
'Usurper',
'Beholder',
'Betrayer',
'Dog',
'Cat',
'Mouse',
'Penguin',
'Eagle',
'Hawk',
'Wolf',
'Coyote',
'Gnome',
'Tiger',
'Panther',
'Jackal',
'Sailor',
'Captain',
'Sapper',
'General',
'Major',
'Bard',
'Toy',
'Star',
'Striker',
'Player',
'Flyer',
'Warrior',
'Wave',
'Cyclone',
'Storm',
'Thunder',
'Twister',
'Ninja',
'Clown',
'Samurai',
'Master',
'Legend',
'Termite',
'Ant',
'Spider',
'Giver',
'Taker',
'Singer',
'Passer',
'Rocketeer',
'Dealer',
'Avenger',
'Ent',
'Archer',
'Agent',
'Yeti',
'Savior',
'Reaper',
'Weather',
'Jester',
'Spear',
'Flex',
'Tripper',
'Judge',
'Cash',
'Smoke',
'Operator',
'Sleeper'
];

export function reviewConstants() {
    let repeatAdjs = [];
    for (let j = 0; j < adjs.length; j++){
      for (let i = j+1; i < adjs.length; i++) {
        if (adjs[j] === adjs[i]) {(repeatAdjs.length !== 0) ? repeatAdjs.push(" " + adjs[j]) : repeatAdjs.push(adjs[j])}
      }
    }

    const lastAdjIndex = repeatAdjs.length - 1;
    repeatAdjs[lastAdjIndex] = (repeatAdjs.length > 1) ? " and" + repeatAdjs[lastAdjIndex] : repeatAdjs[lastAdjIndex];
    let adjsReport = 'There are ' + adjs.length + ' adjectives. ';
    const adjsSingularOrPlural = (repeatAdjs.length === 1) ? ' is' : ' are';

    adjsReport += (repeatAdjs.length !== 0) ? repeatAdjs + adjsSingularOrPlural +' repeated.' : 'No adjectives are repeated.';

    let repeatNouns = [];
    for (let j = 0; j < nouns.length; j++){
      for (let i = j+1; i < nouns.length; i++) {
        if (nouns[j] === nouns[i]) {(repeatNouns.length !== 0) ? repeatNouns.push(" " + nouns[j]) : repeatNouns.push(nouns[j])}
      }
    }

    const lastNounIndex = repeatNouns.length - 1;
    repeatNouns[lastNounIndex] = (repeatNouns.length > 1) ? " and" + repeatNouns[lastNounIndex] : repeatNouns[lastNounIndex];
    let nounsReport = 'There are ' + nouns.length + ' nouns. ';
    const nounsSingularOrPlural = (repeatNouns.length === 1) ? ' is' : ' are';

    nounsReport += (repeatNouns.length !== 0) ? repeatNouns + nounsSingularOrPlural +' repeated.' : 'No nouns are repeated.';

    const uniqueTags = (adjs.length - repeatAdjs.length) * (nouns.length - repeatNouns.length);
    console.log(" " + adjsReport, "\n", nounsReport, "\n", "There are " + uniqueTags + " unique tags available.");
}