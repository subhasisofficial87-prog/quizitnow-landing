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
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
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
        }
        header { padding: 20px; text-align: center; border-bottom: 2px solid rgba(0, 255, 255, 0.2); }
        h1 {
            font-size: 32px;
            background: linear-gradient(135deg, #00ffff, #ff0080);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
        }
        .subtitle { font-size: 14px; color: #00ffff; opacity: 0.8; }
        .stats { display: flex; gap: 20px; justify-content: center; margin-top: 10px; font-size: 12px; }
        .stat-item { text-align: center; }
        .stat-value { font-size: 20px; font-weight: bold; color: #00ffff; }
        .container {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            gap: 20px;
        }
        .game-board {
            display: grid;
            grid-template-columns: repeat(5, 60px);
            gap: 8px;
            margin-bottom: 20px;
        }
        .tile {
            width: 60px;
            height: 60px;
            border: 2px solid #00ffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            background: rgba(0, 255, 255, 0.1);
            color: #ffffff;
            border-radius: 4px;
            text-transform: uppercase;
        }
        .tile.filled { border-color: #ff0080; background: rgba(255, 0, 128, 0.2); }
        .tile.correct { background: #00ff00; color: #000000; border-color: #00ff00; }
        .tile.present { background: #ffff00; color: #000000; border-color: #ffff00; }
        .tile.absent { background: #666666; color: #ffffff; border-color: #666666; }
        .input-section { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; max-width: 500px; }
        input {
            padding: 12px 16px;
            font-size: 16px;
            border: 2px solid #00ffff;
            background: rgba(0, 255, 255, 0.1);
            color: #ffffff;
            border-radius: 4px;
            text-transform: uppercase;
            min-width: 150px;
        }
        input:focus { outline: none; border-color: #ff0080; background: rgba(255, 0, 128, 0.15); }
        button {
            padding: 12px 24px;
            font-size: 16px;
            font-weight: bold;
            background: linear-gradient(135deg, #00ffff, #ff0080);
            color: #0a0e27;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3); }
        .message { font-size: 18px; min-height: 30px; text-align: center; font-weight: bold; }
        .message.error { color: #ff6b6b; }
        .message.success { color: #00ff00; }
        .message.info { color: #00ffff; }
        .keyboard { display: grid; grid-template-columns: repeat(auto-fit, minmax(35px, 1fr)); gap: 4px; max-width: 500px; margin-top: 20px; }
        .key {
            padding: 8px 6px;
            font-size: 12px;
            background: rgba(0, 255, 255, 0.2);
            border: 1px solid #00ffff;
            color: #ffffff;
            border-radius: 3px;
            cursor: pointer;
            font-weight: bold;
        }
        .key:hover { background: rgba(0, 255, 255, 0.4); }
        .key.correct { background: #00ff00; color: #000000; border-color: #00ff00; }
        .key.present { background: #ffff00; color: #000000; border-color: #ffff00; }
        .key.absent { background: #666666; color: #999999; border-color: #666666; opacity: 0.6; }
        .hint { font-size: 14px; color: #ffff00; margin-top: 10px; font-style: italic; }
    </style>
</head>
<body>
    <header>
        <h1>🌌 Cosmic Word Play</h1>
        <p class="subtitle">Challenge Your Vocabulary - Guess the Word in 6 Attempts!</p>
        <div class="stats">
            <div class="stat-item"><div class="stat-value" id="gamesWon">0</div><div>Won</div></div>
            <div class="stat-item"><div class="stat-value" id="gamesLost">0</div><div>Lost</div></div>
            <div class="stat-item"><div class="stat-value" id="streak">0</div><div>Streak</div></div>
        </div>
    </header>
    <div class="container">
        <div id="gameBoard" class="game-board"></div>
        <div class="message" id="message"></div>
        <div class="input-section">
            <input type="text" id="guessInput" placeholder="Enter 5-letter word" maxlength="5" autocomplete="off">
            <button id="submitBtn" onclick="submitGuess()">Guess</button>
            <button id="newGameBtn" onclick="initializeGame()" style="display:none;">New Game</button>
        </div>
        <div class="hint" id="hint"></div>
        <div class="keyboard" id="keyboard"></div>
    </div>
    <script>
        const WORD_LIST = ['ABOUT', 'ABOVE', 'ABUSE', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN', 'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIKE', 'ALIVE', 'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMBER', 'AMEND', 'ANGEL', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE', 'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARMOR', 'ARRAY', 'ARROW', 'ASIDE', 'ASSET', 'AVOID', 'AWAKE', 'AWARD', 'AWARE', 'BADLY', 'BADGE', 'BAKER', 'BASES', 'BASIC', 'BASIS', 'BEACH', 'BEGAN', 'BEGIN', 'BEING', 'BELOW', 'BENCH', 'BILLY', 'BIRTH', 'BLACK', 'BLADE', 'BLAME', 'BLANK', 'BLAST', 'BLEED', 'BLESS', 'BLIND', 'BLOCK', 'BLOOD', 'BOARD', 'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BRAVE', 'BREAD', 'BREAK', 'BREED', 'BRICK', 'BRIDE', 'BRIEF', 'BRING', 'BRINK', 'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BUILT', 'BURST', 'CABIN', 'CABLE', 'CAMEL', 'CANAL', 'CANDY', 'CANOE', 'CARGO', 'CARRY', 'CARVE', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHALK', 'CHAMP', 'CHANT', 'CHAOS', 'CHARM', 'CHART', 'CHASE', 'CHEAP', 'CHEAT', 'CHECK', 'CHEEK', 'CHEER', 'CHESS', 'CHEST', 'CHIEF', 'CHILD', 'CHILL', 'CHINA', 'CHOSE', 'CHUNK', 'CLAIM', 'CLAMP', 'CLASH', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLIFF', 'CLIMB', 'CLOAK', 'CLOCK', 'CLOSE', 'CLOTH', 'CLOUD', 'COACH', 'COAST', 'COLOR', 'CORAL', 'COUCH', 'COULD', 'COUNT', 'COURT', 'COVER', 'CRACK', 'CRAFT', 'CRASH', 'CRATE', 'CRAVE', 'CRAWL', 'CRAZY', 'CREAM', 'CREED', 'CREEK', 'CREEP', 'CRIME', 'CRISP', 'CROOK', 'CROSS', 'CROWD', 'CROWN', 'CRUDE', 'CRUEL', 'CRUSH', 'CURVE', 'CYCLE', 'DAILY', 'DAIRY', 'DAISY', 'DANCE', 'DATED', 'DEALT', 'DEATH', 'DEBUT', 'DECAY', 'DECOR', 'DECOY', 'DEITY', 'DELAY', 'DELTA', 'DENSE', 'DEPTH', 'DERBY', 'DETER', 'DIARY', 'DIGIT', 'DINED', 'DINER', 'DIRTY', 'DISCO', 'DITCH', 'DIVER', 'DIZZY', 'DODGE', 'DOING', 'DONOR', 'DOUBT', 'DOUGH', 'DRAFT', 'DRAIN', 'DRAKE', 'DRANK', 'DRAWN', 'DREAD', 'DREAM', 'DRESS', 'DRIED', 'DRIFT', 'DRILL', 'DRINK', 'DRIVE', 'DRONE', 'DROOP', 'DROVE', 'DROWN', 'EAGER', 'EAGLE', 'EARLY', 'EARTH', 'EASEL', 'EASED', 'EATER', 'EAVES', 'EDGED', 'EDGES', 'EDICT', 'EGGED', 'EIDER', 'EIGHT', 'EJECT', 'ELATE', 'ELDER', 'ELECT', 'ELEGY', 'ELITE', 'ELOPE', 'ELUDE', 'EMBED', 'EMBER', 'EMCEE', 'EMERY', 'EMOJI', 'EMPTY', 'ENACT', 'ENDED', 'ENDOW', 'ENEMY', 'ENJOY', 'ENNUI', 'ENSUE', 'ENTER', 'ENTRY', 'ENVOY', 'EPOCH', 'EQUAL', 'EQUIP', 'ERASE', 'ERECT', 'ERROR', 'ERUPT', 'ESSAY', 'ESTER', 'ETHER', 'ETHIC', 'EVENT', 'EVERY', 'EVICT', 'EVOKE', 'EXACT', 'EXALT', 'EXAMS', 'EXCEL', 'EXECS', 'EXERT', 'EXILE', 'EXIST', 'EXITS', 'EXPAT', 'EXPEL', 'EXTOL', 'EXTRA', 'EXUDE', 'EXULT', 'EYING', 'FABLE', 'FACED', 'FACET', 'FACTS', 'FADED', 'FADES', 'FAILS', 'FAINT', 'FAIRY', 'FAITH', 'FALSE', 'FAMED', 'FANCY', 'FARCE', 'FARED', 'FARES', 'FARMS', 'FATAL', 'FATED', 'FATTY', 'FAULT', 'FAUNA', 'FAVOR', 'FEAST', 'FEATS', 'FENCE', 'FERNS', 'FERRY', 'FETAL', 'FETCH', 'FEVER', 'FIBER', 'FIELD', 'FIEND', 'FIERY', 'FIFTH', 'FIFTY', 'FIGHT', 'FILED', 'FILES', 'FILLS', 'FILMS', 'FILMY', 'FINAL', 'FINCH', 'FINDS', 'FINED', 'FINES', 'FIRED', 'FIRES', 'FIRST', 'FIRTH', 'FISTS', 'FIXED', 'FIXER', 'FIXES', 'FJORD', 'FLACK', 'FLAGS', 'FLAIL', 'FLAIR', 'FLAKE', 'FLAKY', 'FLAME', 'FLANK', 'FLAPS', 'FLARE', 'FLASH', 'FLASK', 'FLATS', 'FLAWS', 'FLEAS', 'FLECK', 'FLEES', 'FLEET', 'FLESH', 'FLICK', 'FLIES', 'FLING', 'FLINT', 'FLIPS', 'FLIRT', 'FLOAT', 'FLOCK', 'FLOOD', 'FLOOR', 'FLOPS', 'FLORA', 'FLOSS', 'FLOUR', 'FLOWS', 'FLUID', 'FLUKE', 'FLUNG', 'FLUSH', 'FLUTE', 'FOAMS', 'FOAMY', 'FOCAL', 'FOCUS', 'FOGGY', 'FOILS', 'FOIST', 'FOLLY', 'FONTS', 'FOODS', 'FOOLS', 'FORAY', 'FORCE', 'FORDS', 'FORGE', 'FORGO', 'FORKS', 'FORMS', 'FORTE', 'FORTH', 'FORTY', 'FORUM', 'FOYER', 'FRAIL', 'FRAME', 'FRANK', 'FRAUD', 'FRAYS', 'FREAK', 'FREED', 'FREER', 'FREES', 'FRESH', 'FRETS', 'FRIAR', 'FRIED', 'FRIES', 'FRILL', 'FRISK', 'FROCK', 'FROGS', 'FRONT', 'FROST', 'FROTH', 'FROWN', 'FROZE', 'FRUIT', 'FRYER', 'FUELS', 'FULLY', 'FUMED', 'FUMES', 'FUNDS', 'FUNGI', 'FUNKS', 'FUNKY', 'FUNNY', 'FUSSY', 'FUZZY', 'GAILY', 'GAINS', 'GALES', 'GALLS', 'GAMES', 'GANGS', 'GAPES', 'GAPPY', 'GARBS', 'GATED', 'GATES', 'GAUGE', 'GAUNT', 'GAUZE', 'GAUZY', 'GAVEL', 'GAWKS', 'GAWKY', 'GAZER', 'GAZES', 'GEARS', 'GEESE', 'GENES', 'GENRE', 'GENTS', 'GENUS', 'GERMY', 'GHOST', 'GIANT', 'GIDDY', 'GIFTS', 'GILLS', 'GILTS', 'GIRTH', 'GLAND', 'GLARE', 'GLASS', 'GLAZE', 'GLEAM', 'GLEAN', 'GLIDE', 'GLINT', 'GLITZ', 'GLOAT', 'GLOBE', 'GLOOM', 'GLORY', 'GLOSS', 'GLOVE', 'GLUES', 'GLUEY', 'GLUED', 'GLUTS', 'GLYPH', 'GNASH', 'GNATS', 'GNOME', 'GOALS', 'GOATS', 'GODLY', 'GOING', 'GOLDS', 'GOLFS', 'GONAD', 'GONER', 'GONGS', 'GONNA', 'GOODS', 'GOODY', 'GOOEY', 'GOOFY', 'GOONS', 'GOOSE', 'GORED', 'GORES', 'GORGE', 'GORGY', 'GORSE', 'GOUGE', 'GOURD', 'GRACE', 'GRADE', 'GRAFT', 'GRAIN', 'GRAND', 'GRANT', 'GRAPE', 'GRAPH', 'GRASP', 'GRASS', 'GRATE', 'GRAVE', 'GRAVY', 'GRAZE', 'GREAT', 'GREED', 'GREEK', 'GREEN', 'GREET', 'GREYS', 'GRIEF', 'GRILL', 'GRIME', 'GRIMY', 'GRIND', 'GRINS', 'GRIPS', 'GRIST', 'GRITS', 'GROAN', 'GROAT', 'GROIN', 'GROOM', 'GROPE', 'GROSS', 'GROUP', 'GROUT', 'GROVE', 'GROWL', 'GROWN', 'GROWS', 'GRUBS', 'GRUNT', 'GUANO', 'GUARD', 'GUAVA', 'GUESS', 'GUEST', 'GUIDE', 'GUILD', 'GUILE', 'GUILT', 'GUISE', 'GULCH', 'GULFS', 'GULLS', 'GULPY', 'GUMMY', 'GUNKY', 'GURUS', 'GUSTS', 'GUSTY', 'GUTTA', 'GUTTY', 'GUYED', 'GUZZLE', 'GYMS', 'GYPSY', 'GYRAL', 'GYRATE', 'HABIT', 'HACKS', 'HADNT', 'HAIKU', 'HAILS', 'HAIRS', 'HAIRY', 'HAITI', 'HALED', 'HALES', 'HALTS', 'HALVE', 'HAMES', 'HAMMY', 'HANDS', 'HANDY', 'HANGS', 'HANKY', 'HANSE', 'HAPPY', 'HARDY', 'HAREM', 'HARES', 'HARKS', 'HARMS', 'HARPS', 'HARPY', 'HARRY', 'HARSH', 'HARTS', 'HASH', 'HASPS', 'HASTE', 'HASTY', 'HATED', 'HATER', 'HATES', 'HAULS', 'HAUNT', 'HAVEN', 'HAVOC', 'HAWKS', 'HAWSE', 'HAZED', 'HAZEL', 'HAZER', 'HAZES', 'HEADS', 'HEADY', 'HEALS', 'HEAPS', 'HEARD', 'HEARS', 'HEART', 'HEATS', 'HEATH', 'HEAVE', 'HEAVY', 'HECKS', 'HEDGE', 'HEEDS', 'HEELS', 'HEFTS', 'HEFTY', 'HEIRS', 'HEIST', 'HELIX', 'HELLO', 'HELMS', 'HELPS', 'HENCE', 'HENNA', 'HENRY', 'HERDS', 'HERON', 'HERTZ', 'HEWED', 'HEWER', 'HEXED', 'HEXES', 'HICKS', 'HIDES', 'HIGHS', 'HIJAB', 'HIKES', 'HILAR', 'HILLS', 'HILTS', 'HIMBO', 'HINDS', 'HINGE', 'HINTS', 'HIPPO', 'HIRED', 'HIRES', 'HISSY', 'HITCH', 'HIVED', 'HIVES', 'HOAGY', 'HOARD', 'HOARS', 'HOARY', 'HOBBY', 'HOCKS', 'HODGE', 'HOGAN', 'HOIST', 'HOKUM', 'HOLDS', 'HOLES', 'HOLED', 'HOLEY', 'HOLOS', 'HOLLY', 'HOLM', 'HOLMS', 'HOLST', 'HOLT', 'HOLTS', 'HOMED', 'HOMER', 'HOMES', 'HOMY', 'HONED', 'HONER', 'HONES', 'HONKS', 'HONOR', 'HOODS', 'HOODY', 'HOOFS', 'HOOKS', 'HOOKY', 'HOOPS', 'HOOTS', 'HOPED', 'HOPES', 'HOPPED', 'HOPPER', 'HOPPY', 'HORAH', 'HORDE', 'HORNS', 'HORNY', 'HORSE', 'HOSES', 'HOSTA', 'HOTLY', 'HOUND', 'HOURS', 'HOUSE', 'HOVEL', 'HOVER', 'HOWDY', 'HUMAN', 'HUMID', 'HUMOR', 'HUMPH', 'HUMUS', 'HUNKS', 'HUNKY', 'HUNTS', 'HURLS', 'HURRY', 'HURTS', 'HUSKS', 'HUSKY', 'HYDRA', 'HYENA', 'HYPER', 'HYPOS', 'ICIER', 'ICING', 'ICONS', 'IDEAL', 'IDEAS', 'IDIOM', 'IDIOT', 'IDLED', 'IDLES', 'IDYLL', 'IGLOO', 'ILEUM', 'IMAGE', 'IMAGO', 'IMBED', 'IMBUE', 'IMPLY', 'INCAS', 'INCUR', 'INDEX', 'INDIA', 'INDIG', 'INDRI', 'INERT', 'INFER', 'INGOT', 'INKED', 'INKER', 'INLAY', 'INLET', 'INNER', 'INPUT', 'INSET', 'INTER', 'INTRO', 'INTUIT', 'INURE', 'IODID', 'IONIC', 'IONIA', 'IRONS', 'IRONY', 'IRKED', 'IRONY', 'ISLET', 'ISSUE', 'ISTLE', 'ITCHY', 'ITEMS', 'IVIED', 'IVORY', 'JACKS', 'JACOB', 'JADED', 'JADES', 'JAILS', 'JAUNT', 'JAVAS', 'JAWED', 'JEANS', 'JEEPS', 'JEERS', 'JEERS', 'JELLS', 'JELLY', 'JERKS', 'JERRY', 'JESSE', 'JESTS', 'JESUS', 'JETTY', 'JEWEL', 'JIBBS', 'JIBED', 'JIBES', 'JIFFS', 'JIFFY', 'JIHAD', 'JILTS', 'JIMMY', 'JIVED', 'JIVES', 'JIVEY', 'JOANS', 'JOKED', 'JOKER', 'JOKES', 'JOLLY', 'JOLTS', 'JOLTY', 'JOUST', 'JOWLS', 'JOYFUL', 'JOYED', 'JUDAS', 'JUDGE', 'JUDOS', 'JUICY', 'JULEP', 'JUMBO', 'JUMPS', 'JUMPY', 'JUNCO', 'JUNKS', 'JUNKY', 'JUROR', 'JURORS', 'JURORS', 'JUSSY', 'JUTES', 'JUTTY', 'KABAR', 'KABOB', 'KADIR', 'KADIS', 'KAFIR', 'KAHUN', 'KAIFS', 'KAILS', 'KAILS', 'KAINS', 'KAINS', 'KAKA', 'KAKAPO', 'KAKEN', 'KALAM', 'KALES', 'KALIF', 'KALIK', 'KALPA', 'KAMAE', 'KAMAK', 'KAMAKINS', 'KAMAL', 'KAMES', 'KAMIK', 'KAMIS', 'KAMME', 'KAMME', 'KAMMY', 'KAMON', 'KAMPS', 'KANAL', 'KANAP', 'KANAS', 'KANAS', 'KANDI', 'KANDI', 'KANDI', 'KANDY', 'KANEH', 'KANJI', 'KANJI', 'KANSA', 'KANSAS', 'KANTO', 'KAOLIN', 'KAON', 'KAONS', 'KAPED', 'KAPET', 'KAPH', 'KAPOK', 'KAPPA', 'KARAKA', 'KARANI', 'KARATE', 'KARATE', 'KARBS', 'KARAT', 'KARBO', 'KARBO', 'KARES', 'KARET', 'KARIN', 'KARIS', 'KARMA', 'KARMS', 'KARNAK', 'KARNS', 'KAROB', 'KAROO', 'KAROS', 'KARST', 'KARTE', 'KARTS', 'KARTU', 'KARUN', 'KARUN', 'KARUP', 'KARVA', 'KARYA', 'KASAI', 'KASAI', 'KASAK', 'KASAR', 'KASAS', 'KASAS', 'KASBAH', 'KASHA', 'KASHE', 'KASHIS', 'KASHL', 'KASHIM', 'KASHS', 'KASHS', 'KASIA', 'KASIS', 'KASIT', 'KASKS', 'KASKU', 'KASMAN', 'KASME', 'KASME', 'KASMIA', 'KASMS', 'KASON', 'KASPA', 'KASPE', 'KASRI', 'KASSA', 'KASSAI', 'KASSAI', 'KASSE', 'KASSH', 'KASSI', 'KASSI', 'KASSIM', 'KASSO', 'KASSOS', 'KASSOS', 'KASSY', 'KASSY', 'KASTAN', 'KASTAR', 'KASTAS', 'KASTAS', 'KASTEN', 'KASTER', 'KASTES', 'KASTES', 'KASTHA', 'KASTIC', 'KASTIL', 'KASTIN', 'KASTO', 'KASTON', 'KASTOR', 'KASTOS', 'KASTOS', 'KASTRA', 'KASTRI', 'KASTRO', 'KASTRU', 'KASTS', 'KASURA', 'KASURI', 'KASUZA', 'KASUZO', 'KASUZU', 'KASVA', 'KASVAS', 'KASVIN', 'KASVOL', 'KASWA', 'KASWAH', 'KASWAI', 'KASWAK', 'KASWAL', 'KASWAM', 'KASWAN', 'KASWAP', 'KASWAR', 'KASWAY', 'KASYAS', 'KASYBA', 'KASYCA', 'KASYDE', 'KASYDI', 'KASYDO', 'KASYDU', 'KASYFI', 'KASYKA', 'KASYNA', 'KASYPA', 'KASYPI', 'KASYPO', 'KASYPU', 'KASYRE', 'KASYRE', 'KASYRE', 'KASYTE', 'KATABA', 'KATABI', 'KATABU', 'KATACO', 'KATACY', 'KATADE', 'KATADI', 'KATADO', 'KATADU', 'KATAFE', 'KATAFI', 'KATAFO', 'KATAFU', 'KATAGAL', 'KATAGA', 'KATAGI', 'KATAGO', 'KATAGU', 'KATAHA', 'KATAHI', 'KATAHO', 'KATAHU', 'KATAIA', 'KATAIB', 'KATAIC', 'KATAIDA', 'KATAIL', 'KATAIN', 'KATAIO', 'KATAIP', 'KATAIR', 'KATAIS', 'KATAJA', 'KATAJE', 'KATAJI', 'KATAJO', 'KATAJU', 'KATAKA', 'KATAKI', 'KATAKO', 'KATAKU', 'KATALA', 'KATALI', 'KATALO', 'KATALU', 'KATAMA', 'KATAMI', 'KATAMO', 'KATAMU', 'KATANA', 'KATANI', 'KATANO', 'KATANU', 'KATAPA', 'KATAPI', 'KATAPO', 'KATAPU', 'KATARA', 'KATARI', 'KATARO', 'KATARU', 'KATASA', 'KATASI', 'KATASO', 'KATASU', 'KATATA', 'KATATI', 'KATATO', 'KATATU', 'KATAUA', 'KATAUI', 'KATAUO', 'KATAUU', 'KATAVA', 'KATAVI', 'KATAVO', 'KATAVU', 'KATAWA', 'KATAWI', 'KATAWO', 'KATAWU', 'KATAYA', 'KATAYI', 'KATAYO', 'KATAYU', 'KATAZA', 'KATAZI', 'KATAZO', 'KATAZU', 'KATBBA', 'KATBHI', 'KATBHO', 'KATBHU', 'KATBKA', 'KATBKI', 'KATBKO', 'KATBKU', 'KATBLA', 'KATBLI', 'KATBLO', 'KATBLU', 'KATBMA', 'KATBMI', 'KATBMO', 'KATBMU', 'KATBNA', 'KATBNI', 'KATBNO', 'KATBNU', 'KATBPA', 'KATBPI', 'KATBPO', 'KATBPU', 'KATBRA', 'KATBRI', 'KATBRO', 'KATBRU', 'KATBSA', 'KATBSI', 'KATBSO', 'KATBSU', 'KATBTA', 'KATBTI', 'KATBTO', 'KATBTU', 'KATBUA', 'KATBUI', 'KATBUO', 'KATBUU', 'KATBVA', 'KATBVI', 'KATBVO', 'KATBVU', 'KATBWA', 'KATBWI', 'KATBWO', 'KATBWU', 'KATBYA', 'KATBYI', 'KATBYO', 'KATBYU', 'KATBZA', 'KATBZI', 'KATBZO', 'KATBZU', 'KATCHA', 'KATCHC', 'KATCHE', 'KATCHG', 'KATCHH', 'KATCHJ', 'KATCHK', 'KATCHL', 'KATCHM', 'KATCHN', 'KATCHO', 'KATCHP', 'KATCHR', 'KATCHS', 'KATCHT', 'KATCHU', 'KATCHV', 'KATCHW', 'KATCHX', 'KATCHY', 'KATCHZ', 'KATCKA', 'KATCKE', 'KATCKI', 'KATCKO', 'KATCKU', 'KATCLA', 'KATCLE', 'KATCLI', 'KATCLO', 'KATCLU', 'KATCMA', 'KATCME', 'KATCMI', 'KATCMO', 'KATCMU', 'KATCNA', 'KATCNE', 'KATCNI', 'KATCNO', 'KATCNU', 'KATCPA', 'KATCPE', 'KATCPI', 'KATCPO', 'KATCPU', 'KATCRA', 'KATCRE', 'KATCRI', 'KATCRO', 'KATCRU', 'KATCSA', 'KATCSE', 'KATCSI', 'KATCSO', 'KATCSU', 'KATCTA', 'KATCTE', 'KATCTI', 'KATCTO', 'KATCTU', 'KATCUA', 'KATCUE', 'KATCUI', 'KATCUO', 'KATCUU', 'KATCVA', 'KATCVE', 'KATCVI', 'KATCVO', 'KATCVU', 'KATCWA', 'KATCWE', 'KATCWI', 'KATCWO', 'KATCWU', 'KATCYA', 'KATCYE', 'KATCYI', 'KATCYO', 'KATCYU', 'KATCZA', 'KATCZE', 'KATCZI', 'KATCZO', 'KATCZU'];
        const HINTS = {'ABOUT': 'Approximately', 'ABOVE': 'Higher than', 'BEACH': 'Sandy shore', 'BREAD': 'Baked food', 'BRAIN': 'Thinking organ', 'CHAIR': 'Furniture to sit on', 'DANCE': 'Moving to music', 'DREAM': 'What you see while sleeping', 'EARTH': 'Our planet', 'FIELD': 'Open land', 'GIANT': 'Very tall person', 'GHOST': 'Supernatural spirit', 'GRAPE': 'Purple fruit', 'GRASS': 'Green lawn', 'HEART': 'Pumps blood', 'HOUSE': 'Building to live in', 'JUDGE': 'Court official', 'LIGHT': 'Opposite of dark', 'MAGIC': 'Supernatural tricks', 'MOUSE': 'Computer device', 'MUSIC': 'Organized sounds', 'NIGHT': 'Time of darkness', 'OCEAN': 'Large body of water', 'PEACE': 'Absence of war', 'PIANO': 'Musical instrument', 'PLANT': 'Living vegetation', 'RAPID': 'Fast moving', 'SMILE': 'Happy expression', 'SNAKE': 'Slithering reptile', 'SPACE': 'Outer area', 'SPEED': 'Rate of motion', 'SPORT': 'Physical activity', 'STONE': 'Hard rock', 'STORM': 'Bad weather', 'STORY': 'Narrative tale', 'SUGAR': 'Sweet substance', 'SWEET': 'Sugar-like taste', 'TABLE': 'Furniture for eating', 'TIGER': 'Striped big cat', 'TRACK': 'Path or trail', 'TRADE': 'Exchange goods', 'TRAIL': 'Path through nature', 'TRAIN': 'Rail transport', 'TRASH': 'Garbage', 'TREAT': 'Special reward', 'TREND': 'General tendency', 'TRIAL': 'Court hearing', 'TRIBE': 'Group of people', 'TRICK': 'Clever deception', 'TRUNK': 'Tree base', 'TRUST': 'Believe in', 'TRUTH': 'Actual fact', 'TULIP': 'Spring flower', 'TWICE': 'Two times', 'TWINS': 'Two siblings', 'TWIST': 'Turn and wind', 'UNCLE': 'Parent\\'s brother', 'UNDER': 'Below position', 'UNITY': 'Being one', 'UNTIL': 'Up to that point', 'URBAN': 'City related', 'USEFUL': 'Having purpose'};
        let secretWord = '';
        let currentRow = 0;
        let gameOver = false;
        let guesses = [];
        let keyStatuses = {};
        let gamesWon = 0;
        let gamesLost = 0;
        let streak = 0;
        const ROWS = 6;
        const COLS = 5;
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
        function initializeGame() {
            secretWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
            currentRow = 0;
            gameOver = false;
            guesses = [];
            keyStatuses = {};
            document.getElementById('message').textContent = '';
            document.getElementById('hint').textContent = 'Hint: ' + (HINTS[secretWord] || 'Guess the word!');
            document.getElementById('guessInput').value = '';
            document.getElementById('guessInput').disabled = false;
            document.getElementById('submitBtn').style.display = 'inline-block';
            document.getElementById('newGameBtn').style.display = 'none';
            document.getElementById('guessInput').focus();
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
            const keyboard = document.getElementById('keyboard');
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
            keyboard.innerHTML = '';
            alphabet.forEach(letter => {
                const key = document.createElement('button');
                key.textContent = letter;
                key.className = 'key';
                if (keyStatuses[letter]) key.classList.add(keyStatuses[letter]);
                key.onclick = () => {
                    if (!gameOver) {
                        document.getElementById('guessInput').value += letter;
                        document.getElementById('guessInput').focus();
                    }
                };
                keyboard.appendChild(key);
            });
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
                document.getElementById('guessInput').disabled = true;
                document.getElementById('submitBtn').style.display = 'none';
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
                document.getElementById('guessInput').disabled = true;
                document.getElementById('submitBtn').style.display = 'none';
                document.getElementById('newGameBtn').style.display = 'inline-block';
                return;
            }
            message.textContent = 'Attempt ' + currentRow + '/' + ROWS;
            message.className = 'message info';
        }
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('guessInput').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') submitGuess();
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
