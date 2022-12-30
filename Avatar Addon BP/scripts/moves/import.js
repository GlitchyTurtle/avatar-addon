// Air - in order of unlock
import AirBlast from './air/AirBlast.js';
import AirDodge from './air/AirDodge.js';
import AirPush from './air/AirPush.js';
import AirPull from './air/AirPull.js';
import AirLaunch from './air/AirLaunch.js';
import AirShockwave from './air/AirShockwave.js';
import AirBubble from './air/AirBubble.js'; // New!
import AirRush from './air/AirRush.js';
import AirVanish from './air/AirVanish.js';
import AirScooter from './air/AirScooter.js';
import AirTornado from './air/AirTornado.js';
import AirArtillery from './air/AirArtillery.js';
import ElytraBoost from './air/ElytraBoost.js'; // New!
import TripleAirBlast from './air/TripleAirBlast.js';
import AirSpirit from './air/AirSpirit.js';

// Water - in order of unlock
import WaterSpear from './water/WaterSpear.js';
import WaterWake from './water/WaterWake.js';
import WaterFlood from './water/WaterFlood.js';
import WaterShield from './water/WaterShield.js';
import WaterLaunch from './water/WaterLaunch.js';
import WaterRush from './water/WaterRush.js';
import WaterSplash from './water/WaterSplash.js';
import FrostWalker from './water/FrostWalker.js';
import IceCage from './water/IceCage.js';
import WaterSpike from './water/WaterSpike.js';
import IceThrow from './water/IceThrow.js';
import WaterBladeBoost from './water/WaterBladeBoost.js';
import BloodBending from './water/BloodBending.js';
import HealingCloud from './water/HealingCloud.js';
import HealingFocus from './water/HealingFocus.js';

// Earth - in order of unlock
import EarthPillar from './earth/EarthPillar.js';
import EarthBurrow from './earth/EarthBurrow.js';
import EarthShove from './earth/EarthShove.js';
import EarthSearch from './earth/EarthSearch.js';
import EarthShield from './earth/EarthShield.js';
import EarthHeadbutt from './earth/EarthHeadbutt.js';
import EarthThrow from './earth/EarthThrow.js';
import EarthTop from './earth/EarthTop.js';
import EarthSpikes from './earth/EarthSpikes.js';
import EarthBigSpike from './earth/EarthBigSpike.js';
import EarthLift from './earth/EarthLift.js'
import UltimateRockBlast from './earth/UltimateRockBlast.js';
import MetalPowerup from './earth/MetalPowerup.js';
import MetalBlast from './earth/MetalBlast.js';
import LavaBlast from './earth/LavaBlast.js';
import MagmaFloor from './earth/MagmaFloor.js';

// Fire - in order of unlock
import FireBlast from './fire/FireBlast.js';
import FireFinder from './fire/FireFinder.js';
import FireShield from './fire/FireShield.js';
import FireSprint from './fire/FireSprint.js';
import Fireball from './fire/Fireball.js';
import FireCharge from './fire/FireCharge.js';
import FireBoosters from './fire/FireBoosters.js';
import FireShockwave from './fire/FireShockwave.js';
import FireSmite from './fire/FireSmite.js';
import FireFinale from './fire/FireFinale.js';
import TripleFirewall from './fire/TripleFirewall.js';
import ConcussivePop from './fire/ConcussivePop.js'; // New!
import CombustionBlast from './fire/CombustionBlast.js';
import LightningStrike from './fire/LightningStrike.js';
import LightningSmite from './fire/LightningSmite.js';

// Avatar State Specials
import AvatarState from './avatar/AvatarState.js' //New!
import SuperchargedAirShove from './avatar/SuperchargedAirShove.js' //New!
import SuperchargedEarthShield from './avatar/SuperchargedEarthShield.js' //New!
import SuperchargedFireShockwave from './avatar/SuperchargedFireShockwave.js' //New!
import SuperchargedIceThrow from './avatar/SuperchargedIceThrow.js' //New!

// Order for avatar is air, water, earth, then fire!
const commands = {
    // Air - In the order they unlock and are displayed!
    AirBlast: AirBlast,//0
    AirDodge: AirDodge,//1
    AirPush: AirPush,//2
    AirPull: AirPull,//3
    AirLaunch: AirLaunch,//4
    AirShockwave: AirShockwave,//5
    AirBubble: AirBubble,//6
    AirRush: AirRush,//7
    AirVanish: AirVanish,//8
    AirScooter: AirScooter,//9
    AirTornado: AirTornado,//10
    AirArtillery: AirArtillery,//11
    ElytraBoost: ElytraBoost,//12
    TripleAirBlast: TripleAirBlast,//15
    AirSpirit: AirSpirit, //20
    // Water - In the order they unlock and are displayed!
    WaterSpear: WaterSpear,//21
    WaterWake: WaterWake,//22
    WaterFlood: WaterFlood,//23
    WaterShield: WaterShield,//24
    WaterLaunch: WaterLaunch,//25
    WaterRush: WaterRush,//26
    WaterSplash: WaterSplash,//27
    FrostWalker: FrostWalker,//28
    IceCage: IceCage,//29
    WaterSpike: WaterSpike,//30
    IceThrow: IceThrow,//31
    WaterBladeBoost: WaterBladeBoost,//35
    BloodBending: BloodBending,//0
    HealingCloud: HealingCloud,//0
    HealingFocus: HealingFocus,//40
    // Earth - In the order they unlock and are displayed!
    EarthPillar: EarthPillar,//41
    EarthBurrow: EarthBurrow,//42
    EarthShove: EarthShove,//43
    EarthSearch: EarthSearch,//44
    EarthShield: EarthShield,//45
    EarthHeadbutt: EarthHeadbutt,//46
    EarthThrow: EarthThrow,//47
    EarthTop: EarthTop,//48
    EarthSpikes: EarthSpikes,//49
    EarthBigSpike: EarthBigSpike,//50
    EarthLift: EarthLift,//51
    UltimateRockBlast: UltimateRockBlast,//55
    MetalPowerup: MetalPowerup,//0
    MetalBlast: MetalBlast,//60
    LavaBlast: LavaBlast,//0
    MagmaFloor: MagmaFloor,//60
    // Fire - In the order they unlock and are displayed!
    FireBlast: FireBlast,//61
    FireFinder: FireFinder,//62
    FireShield: FireShield,//63
    FireSprint: FireSprint,//64
    Fireball: Fireball,//65
    FireCharge: FireCharge,//66
    FireBoosters: FireBoosters,//67
    FireShockwave: FireShockwave,//68
    FireSmite: FireSmite,//69
    FireFinale: FireFinale,//70
    TripleFirewall: TripleFirewall,//75
    ConcussivePop: ConcussivePop,//0
    CombustionBlast: CombustionBlast,//80
    LightningStrike: LightningStrike,//0
    LightningSmite: LightningSmite,//80
    // Avatar State!
    AvatarState: AvatarState,
    SuperchargedAirShove: SuperchargedAirShove,
    SuperchargedEarthShield: SuperchargedEarthShield,
    SuperchargedFireShockwave: SuperchargedFireShockwave,
    SuperchargedIceThrow: SuperchargedIceThrow,
}

export default commands;