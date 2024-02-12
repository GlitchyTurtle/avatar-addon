// Air - in order of unlock
import AirBlast from './air/AirBlast.js';
import AirLeap from './air/AirLeap.js';
import AirPush from './air/AirPush.js';
import AirPull from './air/AirPull.js';
import AirLaunch from './air/AirLaunch.js';
import AirPlume from './air/AirPlume.js';
import AirShockwave from './air/AirShockwave.js';
import AirScooter from './air/AirScooter.js';
import AirRush from './air/AirRush.js';
import AirVanish from './air/AirVanish.js';
import AirTornado from './air/AirTornado.js';
import AirArtillery from './air/AirArtillery.js';
import ElytraBoost from './air/ElytraBoost.js';
import AirBall from './air/AirBall.js';
import PurifyingBreath from './air/PurifyingBreath.js';
import TripleAirBlast from './air/TripleAirBlast.js';
import AirSpirit from './air/AirSpirit.js';
import SniperAirBlast from './air/SniperAirBlast.js';
import AirFinder from './air/AirFinder.js';
import AirPuff from './air/AirPuff.js';
import AirSlam from './air/AirSlam.js';
import SensoryBreath from './air/SensoryBreath.js';
import AirAsphyxiation from './air/AirAsphyxiation.js';

// Water - in order of unlock
import WaterSpear from './water/WaterSpear.js';
import WaterWhip from './water/WaterWhip.js';
import WaterVanish from './water/WaterVanish.js';
import WaterShield from './water/WaterShield.js';
import WaterLaunch from './water/WaterLaunch.js';
import WaterVortex from './water/WaterVortex.js';
import Jetstream from './water/Jetstream.js';
import WaterSplash from './water/WaterSplash.js';
import FrostWalker from './water/FrostWalker.js';
import IceCage from './water/IceCage.js';
import IceSpike from './water/IceSpike.js';
import IceThrow from './water/IceThrow.js';
import WaterBladeBoost from './water/WaterBladeBoost.js';
import BloodBending from './water/BloodBending.js';
import HealingCloud from './water/HealingCloud.js';
import HealingFocus from './water/HealingFocus.js';
import FrostBreath from './water/FrostBreath.js';
import HydratedShockwave from './water/HydratedShockwave.js';
import VineGrapple from './water/VineGrapple.js';
import VineHook from './water/VineHook.js';
import PlantSnare from './water/PlantSnare.js';

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
import MagmaFloor from './earth/MagmaFloor.js';
import MagmaFissure from './earth/MagmaFissure.js';
import EarthRend from './earth/EarthRend.js';
import SeismicSense from './earth/SeismicSense.js';
import EarthSpikeWave from './earth/EarthSpikeWave.js';
import MetalHook from './earth/MetalHook.js';

// Fire - in order of unlock
import FireBlast from './fire/FireBlast.js';
import FireFinder from './fire/FireFinder.js';
import FireDodge from './fire/FireDodge.js';
import FireSprint from './fire/FireSprint.js';
import Fireball from './fire/Fireball.js';
import FireCharge from './fire/FireCharge.js';
import FireBoosters from './fire/FireBoosters.js';
import FireShockwave from './fire/FireShockwave.js';
import FireSmite from './fire/FireSmite.js';
import TripleFirewall from './fire/TripleFirewall.js';
import FireSpear from './fire/FireSpear.js';
import FireSpread from './fire/FireSpread.js';
import FlameWave from './fire/FlameWave.js';
import ConcussivePop from './fire/ConcussivePop.js';
import CombustionBlast from './fire/CombustionBlast.js';
import LightningStrike from './fire/LightningStrike.js';
import LightningBurst from './fire/LightningBurst.js';
import LightningDischarge from './fire/LightningDischarge.js';
import ThunderclapBolt from './fire/ThunderclapBolt.js';
import DragonOfTheWest from './fire/DragonOfTheWest.js';

// Avatar State Specials
import AvatarState from './avatar/AvatarState.js' //New!
import SuperchargedAirShove from './avatar/SuperchargedAirShove.js' //New!
import SuperchargedEarthShield from './avatar/SuperchargedEarthShield.js' //New!
import SuperchargedFireShockwave from './avatar/SuperchargedFireShockwave.js' //New!
import SuperchargedFrostBreath from './avatar/SuperchargedFrostBreath.js' //New!

// Order for avatar is air, water, earth, then fire!
const commands = {
    // The "empty" move
    LeaveEmpty: {name: 'Leave Empty'},
    // Air - In the order they unlock and are displayed!
    AirBlast: AirBlast,
    AirLeap: AirLeap,
    AirPush: AirPush,
    AirPull: AirPull,
    AirLaunch: AirLaunch,
    AirPlume: AirPlume,
    AirShockwave: AirShockwave,
    AirScooter: AirScooter,
    AirRush: AirRush,
    AirVanish: AirVanish,
    AirTornado: AirTornado,
    AirArtillery: AirArtillery,
    ElytraBoost: ElytraBoost,
    AirBall: AirBall,
    PurifyingBreath: PurifyingBreath,
    TripleAirBlast: TripleAirBlast,
    SniperAirBlast: SniperAirBlast,
    AirFinder: AirFinder,
    AirPuff: AirPuff,
    AirSlam: AirSlam,
    SensoryBreath: SensoryBreath,
    AirAsphyxiation: AirAsphyxiation,
    AirSpirit: AirSpirit,
    // Water - In the order they unlock and are displayed!
    WaterSpear: WaterSpear,
    WaterWhip: WaterWhip,
    WaterVanish: WaterVanish,
    WaterShield: WaterShield,
    WaterLaunch: WaterLaunch,
    WaterVortex: WaterVortex,
    Jetstream: Jetstream,
    WaterSplash: WaterSplash,
    FrostWalker: FrostWalker,
    IceCage: IceCage,
    IceSpike: IceSpike,
    IceThrow: IceThrow,
    WaterBladeBoost: WaterBladeBoost,
    BloodBending: BloodBending,
    HealingCloud: HealingCloud,
    HealingFocus: HealingFocus,
    FrostBreath: FrostBreath,
    HydratedShockwave: HydratedShockwave,
    VineGrapple: VineGrapple,
    VineHook: VineHook,
    PlantSnare: PlantSnare,
    // Earth - In the order they unlock and are displayed!
    EarthPillar: EarthPillar,
    EarthBurrow: EarthBurrow,
    EarthShove: EarthShove,
    EarthSearch: EarthSearch,
    EarthShield: EarthShield,
    EarthHeadbutt: EarthHeadbutt,
    EarthThrow: EarthThrow,
    EarthTop: EarthTop,
    EarthSpikes: EarthSpikes,
    EarthBigSpike: EarthBigSpike,
    EarthLift: EarthLift,
    UltimateRockBlast: UltimateRockBlast,
    MetalPowerup: MetalPowerup,
    MetalBlast: MetalBlast,
    MagmaFloor: MagmaFloor,
    MagmaFissure: MagmaFissure,
    SeismicSense: SeismicSense,
    EarthRend: EarthRend,
    EarthSpikeWave: EarthSpikeWave,
    MetalHook: MetalHook,
    // Fire - In the order they unlock and are displayed!
    FireBlast: FireBlast,
    FireFinder: FireFinder,
    FireDodge: FireDodge,
    FireSprint: FireSprint,
    Fireball: Fireball,
    FireCharge: FireCharge,
    FireBoosters: FireBoosters,
    FireShockwave: FireShockwave,
    FireSmite: FireSmite,
    TripleFirewall: TripleFirewall,
    FireSpear: FireSpear,
    FireSpread: FireSpread,
    FlameWave: FlameWave,
    ConcussivePop: ConcussivePop,
    CombustionBlast: CombustionBlast,
    LightningStrike: LightningStrike,
    LightningBurst: LightningBurst,
    LightningDischarge: LightningDischarge,
    ThunderclapBolt: ThunderclapBolt,
    DragonOfTheWest: DragonOfTheWest,
    // Avatar State!
    AvatarState: AvatarState,
    SuperchargedAirShove: SuperchargedAirShove,
    SuperchargedEarthShield: SuperchargedEarthShield,
    SuperchargedFireShockwave: SuperchargedFireShockwave,
    SuperchargedFrostBreath: SuperchargedFrostBreath,
}

export default commands;