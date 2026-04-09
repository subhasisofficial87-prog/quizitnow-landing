import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function CosmicWordPlay() {
  const navigate = useNavigate()

  return (
    <div className="game-page-wrapper">
      <div className="game-header">
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <h1>Cosmic Word Play</h1>
      </div>
      <div className="game-container-full">
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0e27 0%, #0f1535 100%)',
          color: '#ffffff',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          overflow: 'auto'
        }}>
          <iframe
            srcDoc={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cosmic Word Play - Wordly</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: linear-gradient(135deg, #0a0e27 0%, #0f1535 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #ffffff;
            overflow-x: hidden;
        }
        header {
            padding: 30px 20px;
            text-align: center;
            background: linear-gradient(135deg, rgba(0, 255, 255, 0.15) 0%, rgba(255, 0, 128, 0.15) 100%);
            border-bottom: 3px solid #00ffff;
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
        }
        h1 {
            font-size: 48px;
            background: linear-gradient(135deg, #00ffff, #ff0080, #00ffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
            text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
            font-weight: 900;
        }
        .subtitle { font-size: 16px; color: #00ffff; opacity: 0.9; margin-top: 5px; }
        .stats {
            display: flex;
            gap: 40px;
            justify-content: center;
            margin-top: 15px;
            font-size: 14px;
        }
        .stat-item {
            text-align: center;
            padding: 10px 20px;
            background: rgba(0, 255, 255, 0.1);
            border: 2px solid #ff0080;
            border-radius: 8px;
        }
        .stat-value {
            font-size: 28px;
            font-weight: bold;
            background: linear-gradient(135deg, #00ffff, #ff0080);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .container {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 30px 20px;
            gap: 25px;
        }
        .game-board {
            display: grid;
            grid-template-columns: repeat(5, 90px);
            gap: 12px;
            margin-bottom: 20px;
            padding: 20px;
            background: rgba(0, 255, 255, 0.05);
            border-radius: 15px;
            border: 2px solid rgba(0, 255, 255, 0.3);
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
        }
        .tile {
            width: 90px;
            height: 90px;
            border: 3px solid #00ffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            font-weight: bold;
            background: rgba(0, 255, 255, 0.08);
            color: #ffffff;
            border-radius: 8px;
            text-transform: uppercase;
            transition: all 0.3s ease;
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
        }
        .tile.filled {
            border-color: #ff0080;
            background: rgba(255, 0, 128, 0.15);
            box-shadow: 0 0 20px rgba(255, 0, 128, 0.3);
        }
        .tile.correct {
            background: linear-gradient(135deg, #00ff00, #00dd00);
            color: #000000;
            border-color: #00ff00;
            transform: scale(1.05);
            box-shadow: 0 0 25px rgba(0, 255, 0, 0.6);
        }
        .tile.present {
            background: linear-gradient(135deg, #ffff00, #ffdd00);
            color: #000000;
            border-color: #ffff00;
            transform: scale(1.05);
            box-shadow: 0 0 25px rgba(255, 255, 0, 0.6);
        }
        .tile.absent {
            background: #333333;
            color: #888888;
            border-color: #555555;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.1);
        }
        .message {
            font-size: 24px;
            min-height: 35px;
            text-align: center;
            font-weight: bold;
            margin-top: 10px;
        }
        .message.error { color: #ff6b6b; }
        .message.success {
            color: #00ff00;
            text-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
        }
        .message.info { color: #00ffff; }
        .keyboard-container {
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-width: 800px;
            margin-top: 20px;
        }
        .keyboard-row {
            display: flex;
            gap: 8px;
            justify-content: center;
            flex-wrap: wrap;
        }
        .key {
            padding: 16px 12px;
            font-size: 18px;
            font-weight: bold;
            background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(0, 255, 255, 0.1));
            border: 2px solid #00ffff;
            color: #00ffff;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            min-width: 50px;
            text-align: center;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
        }
        .key:hover {
            background: linear-gradient(135deg, rgba(0, 255, 255, 0.4), rgba(0, 255, 255, 0.3));
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
            transform: scale(1.05);
        }
        .key:active {
            transform: scale(0.95);
        }
        .key.correct {
            background: linear-gradient(135deg, #00ff00, #00dd00);
            color: #000000;
            border-color: #00ff00;
            box-shadow: 0 0 15px rgba(0, 255, 0, 0.6);
        }
        .key.present {
            background: linear-gradient(135deg, #ffff00, #ffdd00);
            color: #000000;
            border-color: #ffff00;
            box-shadow: 0 0 15px rgba(255, 255, 0, 0.6);
        }
        .key.absent {
            background: linear-gradient(135deg, #444444, #333333);
            color: #888888;
            border-color: #555555;
            opacity: 0.7;
        }
        .key-large {
            padding: 16px 24px;
            font-size: 18px;
            min-width: 100px;
            background: linear-gradient(135deg, #ff0080, #ff1493);
            color: #ffffff;
            border-color: #ff0080;
            box-shadow: 0 0 20px rgba(255, 0, 128, 0.5);
        }
        .key-large:hover {
            background: linear-gradient(135deg, #ff1493, #ff0080);
            box-shadow: 0 0 30px rgba(255, 0, 128, 0.8);
        }
        .hint {
            font-size: 16px;
            color: #ffff00;
            margin-top: 10px;
            font-style: italic;
            text-shadow: 0 0 10px rgba(255, 255, 0, 0.3);
        }
        .toggle-btn {
            padding: 10px 20px;
            font-size: 14px;
            background: linear-gradient(135deg, #00ffff, #ff0080);
            color: #0a0e27;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            margin-top: 15px;
        }
        .toggle-btn:hover {
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        }
    </style>
</head>
<body>
    <header>
        <h1>🌌 Word Play</h1>
        <p class="subtitle">Challenge Your Vocabulary - Guess the Word in 6 Attempts!</p>
        <div class="stats">
            <div class="stat-item"><div class="stat-value" id="gamesWon">0</div><div>Won</div></div>
            <div class="stat-item"><div class="stat-value" id="gamesLost">0</div><div>Lost</div></div>
            <div class="stat-item"><div class="stat-value" id="streak">0</div><div>Streak</div></div>
        </div>
    </header>
    <div class="container">
        <div id="gameBoard" class="game-board"></div>
        <div class="hint" id="hint"></div>
        <div class="message" id="message"></div>
        <div class="keyboard-container" id="keyboardContainer"></div>
        <button class="toggle-btn" onclick="toggleQwerty()">Switch to QWERTY</button>
        <button id="newGameBtn" onclick="initializeGame()" style="display:none; padding: 16px 32px; font-size: 18px; background: linear-gradient(135deg, #00ff00, #00dd00); color: #000000; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);">New Game</button>
    </div>
    <script>
        const WORD_LIST = ['ABOUT', 'ABOVE', 'ABUSE', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN', 'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIKE', 'ALIVE', 'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMBER', 'AMEND', 'ANGEL', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE', 'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARMOR', 'ARRAY', 'ARROW', 'ASIDE', 'ASSET', 'AVOID', 'AWAKE', 'AWARD', 'AWARE', 'BADLY', 'BADGE', 'BAKER', 'BASES', 'BASIC', 'BASIS', 'BEACH', 'BEGAN', 'BEGIN', 'BEING', 'BELOW', 'BENCH', 'BILLY', 'BIRTH', 'BLACK', 'BLADE', 'BLAME', 'BLANK', 'BLAST', 'BLEED', 'BLESS', 'BLIND', 'BLOCK', 'BLOOD', 'BOARD', 'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BRAVE', 'BREAD', 'BREAK', 'BREED', 'BRICK', 'BRIDE', 'BRIEF', 'BRING', 'BRINK', 'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BUILT', 'BURST', 'CABIN', 'CABLE', 'CAMEL', 'CANAL', 'CANDY', 'CANOE', 'CARGO', 'CARRY', 'CARVE', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHALK', 'CHAMP', 'CHANT', 'CHAOS', 'CHARM', 'CHART', 'CHASE', 'CHEAP', 'CHEAT', 'CHECK', 'CHEEK', 'CHEER', 'CHESS', 'CHEST', 'CHIEF', 'CHILD', 'CHILL', 'CHINA', 'CHOSE', 'CHUNK', 'CLAIM', 'CLAMP', 'CLASH', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLIFF', 'CLIMB', 'CLOAK', 'CLOCK', 'CLOSE', 'CLOTH', 'CLOUD', 'COACH', 'COAST', 'COLOR', 'CORAL', 'COUCH', 'COULD', 'COUNT', 'COURT', 'COVER', 'CRACK', 'CRAFT', 'CRASH', 'CRATE', 'CRAVE', 'CRAWL', 'CRAZY', 'CREAM', 'CREED', 'CREEK', 'CREEP', 'CRIME', 'CRISP', 'CROOK', 'CROSS', 'CROWD', 'CROWN', 'CRUDE', 'CRUEL', 'CRUSH', 'CURVE', 'CYCLE', 'DAILY', 'DAIRY', 'DAISY', 'DANCE', 'DATED', 'DEALT', 'DEATH', 'DEBUT', 'DECAY', 'DECOR', 'DECOY', 'DEITY', 'DELAY', 'DELTA', 'DENSE', 'DEPTH', 'DERBY', 'DETER', 'DIARY', 'DIGIT', 'DINED', 'DINER', 'DIRTY', 'DISCO', 'DITCH', 'DIVER', 'DIZZY', 'DODGE', 'DOING', 'DONOR', 'DOUBT', 'DOUGH', 'DRAFT', 'DRAIN', 'DRAKE', 'DRANK', 'DRAWN', 'DREAD', 'DREAM', 'DRESS', 'DRIED', 'DRIFT', 'DRILL', 'DRINK', 'DRIVE', 'DRONE', 'DROOP', 'DROVE', 'DROWN', 'EAGER', 'EAGLE', 'EARLY', 'EARTH', 'EASEL', 'EASED', 'EATER', 'EAVES', 'EDGED', 'EDGES', 'EDICT', 'EGGED', 'EIDER', 'EIGHT', 'EJECT', 'ELATE', 'ELDER', 'ELECT', 'ELEGY', 'ELITE', 'ELOPE', 'ELUDE', 'EMBED', 'EMBER', 'EMCEE', 'EMERY', 'EMOJI', 'EMPTY', 'ENACT', 'ENDED', 'ENDOW', 'ENEMY', 'ENJOY', 'ENNUI', 'ENSUE', 'ENTER', 'ENTRY', 'ENVOY', 'EPOCH', 'EQUAL', 'EQUIP', 'ERASE', 'ERECT', 'ERROR', 'ERUPT', 'ESSAY', 'ESTER', 'ETHER', 'ETHIC', 'EVENT', 'EVERY', 'EVICT', 'EVOKE', 'EXACT', 'EXALT', 'EXAMS', 'EXCEL', 'EXECS', 'EXERT', 'EXILE', 'EXIST', 'EXITS', 'EXPAT', 'EXPEL', 'EXTOL', 'EXTRA', 'EXUDE', 'EXULT', 'EYING', 'FABLE', 'FACED', 'FACET', 'FACTS', 'FADED', 'FADES', 'FAILS', 'FAINT', 'FAIRY', 'FAITH', 'FALSE', 'FAMED', 'FANCY', 'FARCE', 'FARED', 'FARES', 'FARMS', 'FATAL', 'FATED', 'FATTY', 'FAULT', 'FAUNA', 'FAVOR', 'FEAST', 'FEATS', 'FENCE', 'FERNS', 'FERRY', 'FETAL', 'FETCH', 'FEVER', 'FIBER', 'FIELD', 'FIEND', 'FIERY', 'FIFTH', 'FIFTY', 'FIGHT', 'FILED', 'FILES', 'FILLS', 'FILMS', 'FILMY', 'FINAL', 'FINCH', 'FINDS', 'FINED', 'FINES', 'FIRED', 'FIRES', 'FIRST', 'FIRTH', 'FISTS', 'FIXED', 'FIXER', 'FIXES', 'FJORD', 'FLACK', 'FLAGS', 'FLAIL', 'FLAIR', 'FLAKE', 'FLAKY', 'FLAME', 'FLANK', 'FLAPS', 'FLARE', 'FLASH', 'FLASK', 'FLATS', 'FLAWS', 'FLEAS', 'FLECK', 'FLEES', 'FLEET', 'FLESH', 'FLICK', 'FLIES', 'FLING', 'FLINT', 'FLIPS', 'FLIRT', 'FLOAT', 'FLOCK', 'FLOOD', 'FLOOR', 'FLOPS', 'FLORA', 'FLOSS', 'FLOUR', 'FLOWS', 'FLUID', 'FLUKE', 'FLUNG', 'FLUSH', 'FLUTE', 'FOAMS', 'FOAMY', 'FOCAL', 'FOCUS', 'FOGGY', 'FOILS', 'FOIST', 'FOLLY', 'FONTS', 'FOODS', 'FOOLS', 'FORAY', 'FORCE', 'FORDS', 'FORGE', 'FORGO', 'FORKS', 'FORMS', 'FORTE', 'FORTH', 'FORTY', 'FORUM', 'FOYER', 'FRAIL', 'FRAME', 'FRANK', 'FRAUD', 'FRAYS', 'FREAK', 'FREED', 'FREER', 'FREES', 'FRESH', 'FRETS', 'FRIAR', 'FRIED', 'FRIES', 'FRILL', 'FRISK', 'FROCK', 'FROGS', 'FRONT', 'FROST', 'FROTH', 'FROWN', 'FROZE', 'FRUIT', 'FRYER', 'FUELS', 'FULLY', 'FUMED', 'FUMES', 'FUNDS', 'FUNGI', 'FUNKS', 'FUNKY', 'FUNNY', 'FUSSY', 'FUZZY', 'GAILY', 'GAINS', 'GALES', 'GALLS', 'GAMES', 'GANGS', 'GAPES', 'GAPPY', 'GARBS', 'GATED', 'GATES', 'GAUGE', 'GAUNT', 'GAUZE', 'GAUZY', 'GAVEL', 'GAWKS', 'GAWKY', 'GAZER', 'GAZES', 'GEARS', 'GEESE', 'GENES', 'GENRE', 'GENTS', 'GENUS', 'GERMY', 'GHOST', 'GIANT', 'GIDDY', 'GIFTS', 'GILLS', 'GILTS', 'GIRTH', 'GLAND', 'GLARE', 'GLASS', 'GLAZE', 'GLEAM', 'GLEAN', 'GLIDE', 'GLINT', 'GLITZ', 'GLOAT', 'GLOBE', 'GLOOM', 'GLORY', 'GLOSS', 'GLOVE', 'GLUES', 'GLUEY', 'GLUED', 'GLUTS', 'GLYPH', 'GNASH', 'GNATS', 'GNOME', 'GOALS', 'GOATS', 'GODLY', 'GOING', 'GOLDS', 'GOLFS', 'GONAD', 'GONER', 'GONGS', 'GONNA', 'GOODS', 'GOODY', 'GOOEY', 'GOOFY', 'GOONS', 'GOOSE', 'GORED', 'GORES', 'GORGE', 'GORGY', 'GORSE', 'GOUGE', 'GOURD', 'GRACE', 'GRADE', 'GRAFT', 'GRAIN', 'GRAND', 'GRANT', 'GRAPE', 'GRAPH', 'GRASP', 'GRASS', 'GRATE', 'GRAVE', 'GRAVY', 'GRAZE', 'GREAT', 'GREED', 'GREEK', 'GREEN', 'GREET', 'GREYS', 'GRIEF', 'GRILL', 'GRIME', 'GRIMY', 'GRIND', 'GRINS', 'GRIPS', 'GRIST', 'GRITS', 'GROAN', 'GROAT', 'GROIN', 'GROOM', 'GROPE', 'GROSS', 'GROUP', 'GROUT', 'GROVE', 'GROWL', 'GROWN', 'GROWS', 'GRUBS', 'GRUNT', 'GUANO', 'GUARD', 'GUAVA', 'GUESS', 'GUEST', 'GUIDE', 'GUILD', 'GUILE', 'GUILT', 'GUISE', 'GULCH', 'GULFS', 'GULLS', 'GULPY', 'GUMMY', 'GUNKY', 'GURUS', 'GUSTS', 'GUSTY', 'GUTTA', 'GUTTY', 'GUYED', 'GUZZLE', 'GYMS', 'GYPSY', 'GYRAL', 'GYRATE', 'HABIT', 'HACKS', 'HADNT', 'HAIKU', 'HAILS', 'HAIRS', 'HAIRY', 'HAITI', 'HALED', 'HALES', 'HALTS', 'HALVE', 'HAMES', 'HAMMY', 'HANDS', 'HANDY', 'HANGS', 'HANKY', 'HANSE', 'HAPPY', 'HARDY', 'HAREM', 'HARES', 'HARKS', 'HARMS', 'HARPS', 'HARPY', 'HARRY', 'HARSH', 'HARTS', 'HASH', 'HASPS', 'HASTE', 'HASTY', 'HATED', 'HATER', 'HATES', 'HAULS', 'HAUNT', 'HAVEN', 'HAVOC', 'HAWKS', 'HAWSE', 'HAZED', 'HAZEL', 'HAZER', 'HAZES', 'HEADS', 'HEADY', 'HEALS', 'HEAPS', 'HEARD', 'HEARS', 'HEART', 'HEATS', 'HEATH', 'HEAVE', 'HEAVY', 'HECKS', 'HEDGE', 'HEEDS', 'HEELS', 'HEFTS', 'HEFTY', 'HEIRS', 'HEIST', 'HELIX', 'HELLO', 'HELMS', 'HELPS', 'HENCE', 'HENNA', 'HENRY', 'HERDS', 'HERON', 'HERTZ', 'HEWED', 'HEWER', 'HEXED', 'HEXES', 'HICKS', 'HIDES', 'HIGHS', 'HIJAB', 'HIKES', 'HILAR', 'HILLS', 'HILTS', 'HIMBO', 'HINDS', 'HINGE', 'HINTS', 'HIPPO', 'HIRED', 'HIRES', 'HISSY', 'HITCH', 'HIVED', 'HIVES', 'HOAGY', 'HOARD', 'HOARS', 'HOARY', 'HOBBY', 'HOCKS', 'HODGE', 'HOGAN', 'HOIST', 'HOKUM', 'HOLDS', 'HOLES', 'HOLED', 'HOLEY', 'HOLOS', 'HOLLY', 'HOLM', 'HOLMS', 'HOLST', 'HOLT', 'HOLTS', 'HOMED', 'HOMER', 'HOMES', 'HOMY', 'HONED', 'HONER', 'HONES', 'HONKS', 'HONOR', 'HOODS', 'HOODY', 'HOOFS', 'HOOKS', 'HOOKY', 'HOOPS', 'HOOTS', 'HOPED', 'HOPES', 'HOPPED', 'HOPPER', 'HOPPY', 'HORAH', 'HORDE', 'HORNS', 'HORNY', 'HORSE', 'HOSES', 'HOSTA', 'HOTLY', 'HOUND', 'HOURS', 'HOUSE', 'HOVEL', 'HOVER', 'HOWDY', 'HUMAN', 'HUMID', 'HUMOR', 'HUMPH', 'HUMUS', 'HUNKS', 'HUNKY', 'HUNTS', 'HURLS', 'HURRY', 'HURTS', 'HUSKS', 'HUSKY', 'HYDRA', 'HYENA', 'HYPER', 'HYPOS'];
        const HINTS = {'ABOUT': 'Approximately', 'ABOVE': 'Higher than', 'BEACH': 'Sandy shore', 'BREAD': 'Baked food', 'BRAIN': 'Thinking organ', 'CHAIR': 'Furniture to sit on', 'DANCE': 'Moving to music', 'DREAM': 'What you see while sleeping', 'EARTH': 'Our planet', 'FIELD': 'Open land', 'GIANT': 'Very tall person', 'GHOST': 'Supernatural spirit', 'GRAPE': 'Purple fruit', 'GRASS': 'Green lawn', 'HEART': 'Pumps blood', 'HOUSE': 'Building to live in', 'JUDGE': 'Court official', 'LIGHT': 'Opposite of dark', 'MAGIC': 'Supernatural tricks', 'MOUSE': 'Computer device', 'MUSIC': 'Organized sounds', 'NIGHT': 'Time of darkness', 'OCEAN': 'Large body of water', 'PEACE': 'Absence of war', 'PIANO': 'Musical instrument', 'PLANT': 'Living vegetation', 'RAPID': 'Fast moving', 'SMILE': 'Happy expression', 'SNAKE': 'Slithering reptile', 'SPACE': 'Outer area', 'SPEED': 'Rate of motion', 'SPORT': 'Physical activity', 'STONE': 'Hard rock', 'STORM': 'Bad weather', 'STORY': 'Narrative tale', 'SUGAR': 'Sweet substance', 'SWEET': 'Sugar-like taste', 'TABLE': 'Furniture for eating', 'TIGER': 'Striped big cat', 'TRACK': 'Path or trail', 'TRADE': 'Exchange goods', 'TRAIL': 'Path through nature', 'TRAIN': 'Rail transport', 'TRASH': 'Garbage', 'TREAT': 'Special reward', 'TREND': 'General tendency', 'TRIAL': 'Court hearing', 'TRIBE': 'Group of people', 'TRICK': 'Clever deception', 'TRUNK': 'Tree base', 'TRUST': 'Believe in', 'TRUTH': 'Actual fact', 'TULIP': 'Spring flower', 'TWICE': 'Two times', 'TWINS': 'Two siblings', 'TWIST': 'Turn and wind', 'UNCLE': 'Parent\\'s brother', 'UNDER': 'Below position', 'UNITY': 'Being one', 'UNTIL': 'Up to that point', 'URBAN': 'City related', 'USEFUL': 'Having purpose'};
        let secretWord = '';
        let currentRow = 0;
        let gameOver = false;
        let guesses = [];
        let keyStatuses = {};
        let gamesWon = 0;
        let gamesLost = 0;
        let streak = 0;
        let isQwerty = false;
        const ROWS = 6;
        const COLS = 5;
        const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const QWERTY_ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

        function loadStats() {
            gamesWon = parseInt(localStorage.getItem('gamesWon') || '0');
            gamesLost = parseInt(localStorage.getItem('gamesLost') || '0');
            streak = parseInt(localStorage.getItem('streak') || '0');
            updateStatsDisplay();
        }
        function saveStats() {
            localStorage.setItem('gamesWon', gamesWon);
            localStorage.setItem('gamesLost', gamesLost);
            localStorage.setItem('streak', streak);
            updateStatsDisplay();
        }
        function updateStatsDisplay() {
            document.getElementById('gamesWon').textContent = gamesWon;
            document.getElementById('gamesLost').textContent = gamesLost;
            document.getElementById('streak').textContent = streak;
        }
        function toggleQwerty() {
            isQwerty = !isQwerty;
            document.querySelector('.toggle-btn').textContent = isQwerty ? 'Switch to ABC' : 'Switch to QWERTY';
            renderKeyboard();
        }
        function initializeGame() {
            secretWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
            currentRow = 0;
            gameOver = false;
            guesses = [];
            keyStatuses = {};
            document.getElementById('message').textContent = '';
            document.getElementById('hint').textContent = 'Hint: ' + (HINTS[secretWord] || 'Guess the word!');
            document.getElementById('newGameBtn').style.display = 'none';
            renderBoard();
            renderKeyboard();
        }
        function renderBoard() {
            const board = document.getElementById('gameBoard');
            board.innerHTML = '';
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLS; col++) {
                    const tile = document.createElement('div');
                    tile.className = 'tile';
                    if (row < guesses.length) {
                        const letter = guesses[row][col];
                        tile.textContent = letter;
                        tile.classList.add('filled');
                        if (secretWord[col] === letter) {
                            tile.classList.add('correct');
                        } else if (secretWord.includes(letter)) {
                            tile.classList.add('present');
                        } else {
                            tile.classList.add('absent');
                        }
                    }
                    board.appendChild(tile);
                }
            }
        }
        function renderKeyboard() {
            const container = document.getElementById('keyboardContainer');
            container.innerHTML = '';
            let rows = isQwerty ? QWERTY_ROWS : [
                ALPHABET.substring(0, 7),
                ALPHABET.substring(7, 14),
                ALPHABET.substring(14, 21),
                ALPHABET.substring(21, 26)
            ];
            rows.forEach((row, rowIndex) => {
                const rowDiv = document.createElement('div');
                rowDiv.className = 'keyboard-row';

                if (rowIndex === 0 && isQwerty) {
                    row.split('').forEach(letter => createKeyButton(letter, rowDiv));
                } else if (rowIndex === 1 && isQwerty) {
                    rowDiv.style.marginLeft = '20px';
                    row.split('').forEach(letter => createKeyButton(letter, rowDiv));
                } else if (rowIndex === 2 && isQwerty) {
                    const shiftBtn = document.createElement('button');
                    shiftBtn.textContent = '⇧ Shift';
                    shiftBtn.className = 'key key-large';
                    shiftBtn.style.minWidth = '80px';
                    rowDiv.appendChild(shiftBtn);
                    row.split('').forEach(letter => createKeyButton(letter, rowDiv));
                    const delBtn = document.createElement('button');
                    delBtn.textContent = '⌫';
                    delBtn.className = 'key key-large';
                    delBtn.style.minWidth = '80px';
                    delBtn.onclick = deleteLetter;
                    rowDiv.appendChild(delBtn);
                } else {
                    row.split('').forEach(letter => createKeyButton(letter, rowDiv));
                }
                container.appendChild(rowDiv);
            });
            if (!isQwerty) {
                const controlsRow = document.createElement('div');
                controlsRow.className = 'keyboard-row';
                const backBtn = document.createElement('button');
                backBtn.textContent = '⌫ BACKSPACE';
                backBtn.className = 'key key-large';
                backBtn.style.minWidth = '150px';
                backBtn.onclick = deleteLetter;
                controlsRow.appendChild(backBtn);
                const enterBtn = document.createElement('button');
                enterBtn.textContent = 'ENTER ⏎';
                enterBtn.className = 'key key-large';
                enterBtn.style.minWidth = '150px';
                enterBtn.style.marginLeft = '10px';
                enterBtn.onclick = submitGuess;
                controlsRow.appendChild(enterBtn);
                container.appendChild(controlsRow);
            }
        }
        function createKeyButton(letter, container) {
            const key = document.createElement('button');
            key.textContent = letter;
            key.className = 'key';
            if (keyStatuses[letter]) key.classList.add(keyStatuses[letter]);
            key.onclick = () => {
                if (!gameOver) {
                    const input = document.getElementById('guessInput');
                    if (input.value.length < COLS) {
                        input.value += letter;
                    }
                }
            };
            container.appendChild(key);
        }
        function deleteLetter() {
            const input = document.getElementById('guessInput');
            input.value = input.value.slice(0, -1);
        }
        function submitGuess() {
            const input = document.getElementById('guessInput').value.toUpperCase();
            const message = document.getElementById('message');
            if (input.length !== COLS) {
                message.textContent = 'Word must be 5 letters!';
                message.className = 'message error';
                return;
            }
            if (!WORD_LIST.includes(input)) {
                message.textContent = 'Not a valid word!';
                message.className = 'message error';
                return;
            }
            guesses.push(input);
            currentRow++;
            document.getElementById('guessInput').value = '';
            for (let i = 0; i < COLS; i++) {
                const letter = input[i];
                if (secretWord[i] === letter) {
                    keyStatuses[letter] = 'correct';
                } else if (secretWord.includes(letter) && keyStatuses[letter] !== 'correct') {
                    keyStatuses[letter] = 'present';
                } else if (!keyStatuses[letter]) {
                    keyStatuses[letter] = 'absent';
                }
            }
            renderBoard();
            renderKeyboard();
            if (input === secretWord) {
                message.textContent = '🎉 You won! Amazing!';
                message.className = 'message success';
                gameOver = true;
                gamesWon++;
                streak++;
                saveStats();
                document.getElementById('newGameBtn').style.display = 'inline-block';
                return;
            }
            if (currentRow >= ROWS) {
                message.textContent = 'Game Over! The word was: ' + secretWord;
                message.className = 'message error';
                gameOver = true;
                gamesLost++;
                streak = 0;
                saveStats();
                document.getElementById('newGameBtn').style.display = 'inline-block';
                return;
            }
            message.textContent = 'Attempt ' + currentRow + '/' + ROWS;
            message.className = 'message info';
        }
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('guessInput').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') submitGuess();
                if (e.key === 'Backspace') e.preventDefault();
            });
            document.addEventListener('keydown', (e) => {
                if (!gameOver && e.key.length === 1 && /[A-Za-z]/.test(e.key)) {
                    const input = document.getElementById('guessInput');
                    if (input.value.length < COLS) {
                        input.value += e.key.toUpperCase();
                    }
                }
                if (e.key === 'Backspace') {
                    deleteLetter();
                    e.preventDefault();
                }
                if (e.key === 'Enter') {
                    submitGuess();
                    e.preventDefault();
                }
            });
            loadStats();
            initializeGame();
        });
    </script>
</body>
</html>`}
            title="Cosmic Word Play"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '8px'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CosmicWordPlay
