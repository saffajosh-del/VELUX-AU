export type RoofType = 'pitched' | 'flat';
export type OpeningType = 'fixed' | 'manual' | 'electric' | 'solar';

export interface Size {
    code: string;
    width: number;
    height: number;
    label: string; // "550 x 700"
}

export interface Product {
    id: string;
    model: string;
    name: string;
    roofType: RoofType[];
    openingType: OpeningType;
    prices: Record<string, number>; // sizeCode -> price
    newPrices?: Record<string, number>; // sizeCode -> price
    compatibleSizes: string[];
    image?: string;
    uValue?: number;
    shgc?: number;
    rw?: number;
    vlt?: number;
    balRating?: string;
    hailResistance?: string;
    daylightArea?: Record<string, number>;
}

export interface Flashing {
    id: string;
    name: string;
    prices: Record<string, number>;
    newPrices?: Record<string, number>;
}

export interface Blind {
    id: string;
    model: string;
    name: string;
    type: string; // "darkening" or "translucent"
    compatibleModels: string[]; // "FS", "VS", "VSE", "VSS"
    prices: Record<string, number>;
    newPrices?: Record<string, number>;
    image?: string;
    subtitle?: string;
}

export interface Accessory {
    id: string;
    name: string;
    compatibleModels: string[];
    prices: Record<string, number>;
    newPrices?: Record<string, number>;
}

// ----------------------------------------------------------------------
// DATA
// ----------------------------------------------------------------------

export const PITCHED_SIZES: Size[] = [
    { code: 'C01', width: 550, height: 700, label: '550 x 700' },
    { code: 'C04', width: 550, height: 980, label: '550 x 980' },
    { code: 'C06', width: 550, height: 1180, label: '550 x 1180' },
    { code: 'C08', width: 550, height: 1400, label: '550 x 1400' },
    { code: 'C12', width: 550, height: 1800, label: '550 x 1800' },
    { code: 'M02', width: 780, height: 780, label: '780 x 780' },
    { code: 'M04', width: 780, height: 980, label: '780 x 980' },
    { code: 'M06', width: 780, height: 1180, label: '780 x 1180' },
    { code: 'M08', width: 780, height: 1400, label: '780 x 1400' },
    { code: 'S01', width: 1140, height: 700, label: '1140 x 700' },
    { code: 'S06', width: 1140, height: 1180, label: '1140 x 1180' },
];

export const FLAT_SIZES: Size[] = [
    { code: '1430', width: 368, height: 775, label: '368 x 775' },
    { code: '2222', width: 572, height: 572, label: '572 x 572' },
    { code: '2230', width: 572, height: 775, label: '572 x 775' },
    { code: '2234', width: 572, height: 876, label: '572 x 876' },
    { code: '2246', width: 572, height: 1181, label: '572 x 1181' },
    { code: '2270', width: 572, height: 1792, label: '572 x 1792' },
    { code: '3030', width: 775, height: 775, label: '775 x 775' },
    { code: '3046', width: 775, height: 1181, label: '775 x 1181' },
    { code: '3055', width: 775, height: 1410, label: '775 x 1410' },
    { code: '3072', width: 775, height: 1842, label: '775 x 1842' },
    { code: '3434', width: 876, height: 876, label: '876 x 876' },
    { code: '3446', width: 876, height: 1181, label: '876 x 1181' },
    { code: '4622', width: 1181, height: 572, label: '1181 x 572' },
    { code: '4646', width: 1181, height: 1181, label: '1181 x 1181' },
    { code: '4672', width: 1181, height: 1842, label: '1181 x 1842' },
];

export const ROOF_WINDOW_SIZES: Size[] = [
    { code: 'CK02', width: 550, height: 780, label: '550 x 780' },
    { code: 'CK04', width: 550, height: 980, label: '550 x 980' },
    { code: 'MK04', width: 780, height: 980, label: '780 x 980' },
    { code: 'MK06', width: 780, height: 1180, label: '780 x 1180' },
    { code: 'MK08', width: 780, height: 1400, label: '780 x 1400' },
    { code: 'SK06', width: 1140, height: 1180, label: '1140 x 1180' },
];

const PITCHED_DAYLIGHT: Record<string, number> = {
    'C01': 0.18, 'C04': 0.27, 'C06': 0.33, 'C08': 0.40, 'C12': 0.54,
    'M02': 0.31, 'M04': 0.41, 'M06': 0.51, 'M08': 0.62, 'S01': 0.45,
    'S06': 0.85
};

const ROOF_WINDOW_DAYLIGHT: Record<string, number> = {
    'CK02': 0.22, 'CK04': 0.29, 'MK04': 0.47, 'MK06': 0.59, 'MK08': 0.72, 'SK06': 0.95
};

const FLAT_DAYLIGHT: Record<string, number> = {
    '1430': 0.29, '2222': 0.33, '2230': 0.44, '2234': 0.50, '2246': 0.68, '2270': 1.03,
    '3030': 0.60, '3046': 0.92, '3055': 1.09, '3072': 1.43, '3434': 0.77, '3446': 1.03,
    '4622': 0.68, '4646': 1.39, '4672': 2.18
};

const TUNNEL_DAYLIGHT: Record<string, number> = {
    '0K14': 0.10, '014': 0.10
};

const rawPRODUCTS: Product[] = [
    // PITCHED ROOF
    {
        id: 'fs',
        model: 'FS',
        name: 'Fixed Skylight (FS)',
        roofType: ['pitched'],
        openingType: 'fixed',
        compatibleSizes: ['C01', 'C04', 'C06', 'C08', 'C12', 'M02', 'M04', 'M06', 'M08', 'S01', 'S06'],
        prices: {
            'C01': 558, 'C04': 645, 'C06': 740, 'C08': 827, 'C12': 1170,
            'M02': 761, 'M04': 803, 'M06': 909, 'M08': 1017, 'S01': 885,
            'S06': 1056
        },
        newPrices: {
            'C01': 572, 'C04': 661, 'C06': 759, 'C08': 848, 'C12': 1199,
            'M02': 780, 'M04': 823, 'M06': 932, 'M08': 1042, 'S01': 907,
            'S06': 1082
        },
        image: '/FS-skylight.jpg',
        uValue: 2.5,
        shgc: 0.21,
        rw: 32,
        vlt: 0.48,
        balRating: 'BAL-40',
        hailResistance: 'ASTM E822',
        daylightArea: PITCHED_DAYLIGHT
    },
    {
        id: 'vs',
        model: 'VS',
        name: 'Manual Opening Skylight (VS)',
        roofType: ['pitched'],
        openingType: 'manual',
        compatibleSizes: ['C01', 'C04', 'C06', 'C08', 'M02', 'M04', 'M06', 'M08', 'S01', 'S06'],
        prices: {
            'C01': 1271, 'C04': 1292, 'C06': 1381, 'C08': 1451, 'M02': 1451,
            'M04': 1514, 'M06': 1653, 'M08': 1792, 'S01': 1594, 'S06': 2009
        },
        newPrices: {
            'C01': 1303, 'C04': 1324, 'C06': 1415, 'C08': 1487, 'M02': 1487,
            'M04': 1552, 'M06': 1694, 'M08': 1836, 'S01': 1634, 'S06': 2059
        },
        image: '/VS-skylight.jpg',
        uValue: 2.5,
        shgc: 0.21,
        rw: 32,
        vlt: 0.48,
        balRating: 'BAL-40',
        hailResistance: 'ASTM E822',
        daylightArea: PITCHED_DAYLIGHT
    },
    {
        id: 'vse',
        model: 'VSE',
        name: 'Electric Opening Skylight (VSE)',
        roofType: ['pitched'],
        openingType: 'electric',
        compatibleSizes: ['C01', 'C04', 'C06', 'C08', 'M04', 'M06', 'M08', 'S01', 'S06'],
        prices: {
            'C01': 2392, 'C04': 2421, 'C06': 2486, 'C08': 2547, 'M04': 2596,
            'M06': 2709, 'M08': 2823, 'S01': 2686, 'S06': 2995
        },
        newPrices: {
            'C01': 2451, 'C04': 2481, 'C06': 2548, 'C08': 2610, 'M04': 2661,
            'M06': 2776, 'M08': 2893, 'S01': 2753, 'S06': 3070
        },
        image: '/VSE-skylight.jpg',
        uValue: 2.5,
        shgc: 0.21,
        rw: 32,
        vlt: 0.48,
        balRating: 'BAL-40',
        hailResistance: 'ASTM E822',
        daylightArea: PITCHED_DAYLIGHT
    },
    {
        id: 'vss',
        model: 'VSS',
        name: 'Solar Opening Skylight (VSS)',
        roofType: ['pitched'],
        openingType: 'solar',
        compatibleSizes: ['C01', 'C04', 'C06', 'C08', 'M02', 'M04', 'M06', 'M08', 'S01', 'S06'],
        prices: {
            'C01': 2579, 'C04': 2610, 'C06': 2680, 'C08': 2746, 'M02': 2735,
            'M04': 2799, 'M06': 2921, 'M08': 3043, 'S01': 2896, 'S06': 3229
        },
        newPrices: {
            'C01': 2643, 'C04': 2675, 'C06': 2747, 'C08': 2814, 'M02': 2803,
            'M04': 2869, 'M06': 2993, 'M08': 3119, 'S01': 2968, 'S06': 3310
        },
        image: '/VSS-skylight.png',
        uValue: 2.5,
        shgc: 0.21,
        rw: 32,
        vlt: 0.48,
        balRating: 'BAL-40',
        hailResistance: 'ASTM E822',
        daylightArea: PITCHED_DAYLIGHT
    },
    // ROOF WINDOWS
    {
        id: 'ggl',
        model: 'GGL',
        name: 'Centre Pivot Roof Window (GGL)',
        roofType: ['pitched'],
        openingType: 'manual',
        compatibleSizes: ['CK02', 'CK04', 'MK04', 'MK08', 'SK06'],
        prices: {
            'CK02': 842, 'CK04': 893, 'MK04': 1045, 'MK08': 1277, 'SK06': 1581
        },
        newPrices: {
            'CK02': 863, 'CK04': 915, 'MK04': 1071, 'MK08': 1308, 'SK06': 1620
        },
        image: '/GGL-roof-window.png',
        uValue: 1.3,
        shgc: 0.31,
        rw: 34,
        vlt: 0.64,
        balRating: 'BAL-40',
        hailResistance: 'ASTM E822',
        daylightArea: ROOF_WINDOW_DAYLIGHT
    },
    {
        id: 'gpl',
        model: 'GPL',
        name: 'Dual Action Roof Window (GPL)',
        roofType: ['pitched'],
        openingType: 'manual',
        compatibleSizes: ['CK04', 'MK04', 'MK06', 'MK08', 'SK06'],
        prices: {
            'CK04': 1003, 'MK04': 1153, 'MK06': 1264, 'MK08': 1429, 'SK06': 1665
        },
        newPrices: {
            'CK04': 1028, 'MK04': 1182, 'MK06': 1295, 'MK08': 1465, 'SK06': 1706
        },
        image: '/GPL-roof-window.png',
        uValue: 1.3,
        shgc: 0.31,
        rw: 34,
        vlt: 0.64,
        balRating: 'BAL-40',
        hailResistance: 'ASTM E822',
        daylightArea: ROOF_WINDOW_DAYLIGHT
    },

    // FLAT ROOF
    {
        id: 'fcm',
        model: 'FCM',
        name: 'Flat Roof Fixed (FCM)',
        roofType: ['flat'],
        openingType: 'fixed',
        compatibleSizes: ['1430', '2222', '2230', '2234', '2246', '2270', '3030', '3046', '3055', '3072', '3434', '3446', '4646', '4672'],
        prices: {
            '1430': 379, '2222': 411, '2230': 447, '2234': 473, '2246': 537,
            '2270': 968, '3030': 519, '3046': 659, '3055': 804, '3072': 2041,
            '3434': 591, '3446': 696, '4646': 731, '4672': 2271
        },
        newPrices: {
            '1430': 388, '2222': 421, '2230': 458, '2234': 485, '2246': 550,
            '2270': 992, '3030': 532, '3046': 675, '3055': 824, '3072': 2090,
            '3434': 605, '3446': 713, '4646': 749, '4672': 2326
        },
        image: '/FCM-skylight.jpg',
        uValue: 2.9,
        shgc: 0.28,
        rw: 29,
        vlt: 0.61,
        balRating: 'BAL-40',
        hailResistance: 'ASTM E822',
        daylightArea: FLAT_DAYLIGHT
    },
    {
        id: 'vcm',
        model: 'VCM',
        name: 'Flat Roof Manual (VCM)',
        roofType: ['flat'],
        openingType: 'manual',
        compatibleSizes: ['2222', '2234', '2246', '3030', '3046', '3434', '4646'],
        prices: {
            '2222': 1342, '2234': 1449, '2246': 1601, '3030': 1678, '3046': 1822,
            '3434': 1753, '4646': 2136
        },
        newPrices: {
            '2222': 1375, '2234': 1485, '2246': 1641, '3030': 1720, '3046': 1867,
            '3434': 1797, '4646': 2189
        },
        image: '/VCM-skylight.jpg',
        uValue: 2.9,
        shgc: 0.24,
        rw: 31,
        vlt: 0.55,
        balRating: 'BAL-40',
        hailResistance: 'ASTM E822',
        daylightArea: FLAT_DAYLIGHT
    },
    {
        id: 'vcs',
        model: 'VCS',
        name: 'Flat Roof Solar (VCS)',
        roofType: ['flat'],
        openingType: 'solar',
        compatibleSizes: ['2222', '2234', '2246', '3030', '3046', '3434', '4622', '4646'],
        prices: {
            '2222': 2598, '2234': 2747, '2246': 2927, '3030': 2937, '3046': 3081,
            '3434': 3000, '4622': 2946, '4646': 3228
        },
        newPrices: {
            '2222': 2663, '2234': 2816, '2246': 3000, '3030': 3010, '3046': 3158,
            '3434': 3075, '4622': 3020, '4646': 3309
        },
        image: '/VCS-skylight.jpg',
        uValue: 2.9,
        shgc: 0.24,
        rw: 31,
        vlt: 0.55,
        balRating: 'BAL-40',
        hailResistance: 'ASTM E822',
        daylightArea: FLAT_DAYLIGHT
    },
    // SUN TUNNELS
    {
        id: 'twr',
        model: 'TWR',
        name: 'Rigid Sun Tunnel (TWR)',
        roofType: ['pitched', 'flat'],
        openingType: 'fixed',
        compatibleSizes: ['0K14'],
        prices: {
            '0K14': 781
        },
        newPrices: {
            '0K14': 800
        },
        image: '/TWR-sun-tunnel.jpg',
        uValue: 2.9,
        shgc: 0.22,
        rw: 26,
        vlt: 0.65,
        balRating: 'BAL-29',
        hailResistance: 'Class 3',
        daylightArea: TUNNEL_DAYLIGHT
    },
    {
        id: 'twf',
        model: 'TWF',
        name: 'Flexible Sun Tunnel (TWF)',
        roofType: ['pitched', 'flat'],
        openingType: 'fixed',
        compatibleSizes: ['0K14'],
        prices: {
            '0K14': 482
        },
        newPrices: {
            '0K14': 494
        },
        image: '/TWF-sun-tunnel.jpg',
        uValue: 2.9,
        shgc: 0.22,
        rw: 26,
        vlt: 0.65,
        balRating: 'BAL-29',
        hailResistance: 'Class 3',
        daylightArea: TUNNEL_DAYLIGHT
    },
    {
        id: 'tcr',
        model: 'TCR',
        name: 'Sun Tunnel (TCR)',
        roofType: ['flat', 'pitched'],
        openingType: 'fixed',
        compatibleSizes: ['014'],
        prices: {
            '014': 831
        },
        newPrices: {
            '014': 851
        },
        image: '/TCR-sun-tunnel.jpg',
        uValue: 2.9,
        shgc: 0.22,
        rw: 26,
        vlt: 0.65,
        balRating: 'BAL-29',
        hailResistance: 'Class 3',
        daylightArea: TUNNEL_DAYLIGHT
    }
];

const rawFLASHINGS: Flashing = {
    id: 'edw',
    name: 'EDW Flashing (Tile/Corrugated)',
    prices: {
            'C01': 117, 'C04': 123, 'C06': 124, 'C08': 132, 'C12': 164,
            'M02': 142, 'M04': 142, 'M06': 146, 'M08': 149, 'S01': 150,
            'S06': 176, 'CK02': 122, 'CK04': 135, 'MK04': 155, 'MK06': 160,
            'MK08': 163, 'SK06': 193
        },
        newPrices: {
            'C01': 120, 'C04': 126, 'C06': 127, 'C08': 135, 'C12': 168,
            'CK02': 119, 'CK04': 132, 'M02': 145, 'M04': 145, 'M06': 149,
            'M08': 152, 'MK04': 151, 'MK06': 156, 'MK08': 159, 'S01': 154,
            'S06': 180, 'SK06': 188
        },
};

const rawBLINDS: Blind[] = [
    {
        id: 'fscd',
        model: 'FSCD',
        name: 'Solar Honeycomb',
        subtitle: '(Darkening)',
        type: 'darkening',
        compatibleModels: ['FS'],
        prices: {
            'C01': 635, 'C04': 635, 'C06': 635, 'C08': 635, 'C12': 794,
            'M02': 650, 'M04': 650, 'M06': 650, 'M08': 650, 'S01': 663,
            'S06': 663
        },
        newPrices: {
            'C01': 651, 'C04': 651, 'C06': 651, 'C08': 651, 'C12': 814,
            'M02': 666, 'M04': 666, 'M06': 666, 'M08': 666, 'S01': 680,
            'S06': 680
        },
        image: '/solar-honeycomb-blackout.png'
    },
    {
        id: 'fsld',
        model: 'FSLD',
        name: 'Solar Translucent',
        subtitle: '(Light Filtering)',
        type: 'translucent',
        compatibleModels: ['FS'],
        prices: {
            'C01': 635, 'C04': 635, 'C06': 635, 'C08': 635, 'C12': 0,
            'M02': 650, 'M04': 650, 'M06': 650, 'M08': 650, 'S01': 663,
            'S06': 663
        },
        newPrices: {
            'C01': 651, 'C04': 651, 'C06': 651, 'C08': 651, 'M02': 666,
            'M04': 666, 'M06': 666, 'M08': 666, 'S01': 680, 'S06': 680
        },
        image: '/solar-translucent.png'
        // Note: C12 excluded in data markdown for FSLD/FSCH/FSLH
    },
    {
        id: 'fsch',
        model: 'FSCH',
        name: 'Solar Honeycomb',
        subtitle: '(Darkening)',
        type: 'darkening',
        compatibleModels: ['VS', 'VSE', 'VSS'],
        prices: {
            'C01': 635, 'C04': 635, 'C06': 635, 'C08': 635, 'M02': 650,
            'M04': 650, 'M06': 650, 'M08': 650, 'S01': 663, 'S06': 663
        },
        newPrices: {
            'C01': 651, 'C04': 651, 'C06': 651, 'C08': 651, 'M02': 666,
            'M04': 666, 'M06': 666, 'M08': 666, 'S01': 680, 'S06': 680
        },
        image: '/solar-honeycomb-blackout.png'
    },
    {
        id: 'fslh',
        model: 'FSLH',
        name: 'Solar Translucent',
        subtitle: '(Light Filtering)',
        type: 'translucent',
        compatibleModels: ['VS', 'VSE', 'VSS'],
        prices: {
            'C01': 635, 'C04': 635, 'C06': 635, 'C08': 635, 'M02': 650,
            'M04': 650, 'M06': 650, 'M08': 650, 'S01': 663, 'S06': 663
        },
        newPrices: {
            'C01': 651, 'C04': 651, 'C06': 651, 'C08': 651, 'M02': 666,
            'M04': 666, 'M06': 666, 'M08': 666, 'S01': 680, 'S06': 680
        },
        image: '/solar-translucent.png'
    },
    // ROOF WINDOW BLINDS
    {
        id: 'fhc',
        model: 'FHC',
        name: 'Manual Honeycomb Blackout',
        subtitle: '(Room Darkening)',
        type: 'darkening',
        compatibleModels: ['GGL', 'GPL'],
        prices: {
            'CK02': 257, 'CK04': 273, 'MK04': 283, 'MK06': 302, 'MK08': 329,
            'SK06': 355
        },
        newPrices: {
            'CK02': 264, 'CK04': 279, 'MK04': 290, 'MK06': 310, 'MK08': 337,
            'SK06': 364
        },
        image: '/solar-honeycomb-blackout.png' // Utilizing existing image for now
    },
    {
        id: 'zil',
        model: 'ZIL',
        name: 'Insect Screen',
        type: 'accessory',
        compatibleModels: ['GGL', 'GPL'],
        prices: {
            'CK02': 351, 'CK04': 351, 'MK04': 433, 'MK06': 433, 'MK08': 433,
            'SK06': 481, 'CK06': 351, 'MK10': 433, 'SK10': 481
        },
        newPrices: {
            'CK06': 360, 'MK10': 444, 'SK10': 493
        },
        image: '/ZIL-insect-screen.png'
    },
    // Flat roof blinds
    {
        id: 'fscc',
        model: 'FSCC',
        name: 'Solar Honeycomb',
        subtitle: '(Darkening)',
        type: 'darkening',
        compatibleModels: ['FCM', 'VCM', 'VCS'],
        prices: {
            '1430': 615, '2222': 637, '2230': 637, '2234': 637, '2246': 637,
            '2270': 731, '3030': 649, '3046': 649, '3055': 640, '3072': 706,
            '3434': 662, '3446': 662, '4646': 704, '4672': 706, '4622': 704
        },
        newPrices: {
            '2222': 653, '2230': 653, '2234': 653, '2246': 653, '2270': 750,
            '3030': 665, '3046': 665, '3434': 679, '3446': 679, '4622': 722,
            '4646': 722
        },
        image: '/solar-honeycomb-blackout.png'
    }
];

const rawACCESSORIES: Accessory[] = [
    {
        id: 'zzz199',
        name: 'ZZZ 199 Blind Tray',
        compatibleModels: ['FCM'],
        prices: {
            '2222': 98, '2230': 98, '2234': 98, '2246': 98, '2270': 126,
            '3030': 101, '3046': 101, '3434': 105, '3446': 105, '4622': 109,
            '4646': 109
        },
        newPrices: {
            '2222': 100, '2230': 100, '2234': 100, '2246': 100, '2270': 130,
            '3030': 104, '3046': 104, '3434': 108, '3446': 108, '4622': 112,
            '4646': 112
        },
    },
    {
        id: 'ztr0k14',
        name: 'Rigid 1240mm Extension',
        compatibleModels: ['TWR', 'TCR'],
        prices: {
            '0K14': 307
        },
        newPrices: {
            '0K14': 315
        },
    }
];

const isAugust1stOrLater = new Date() >= new Date('2026-08-01T00:00:00');

const withActivePrices = <T extends { prices: Record<string, number>; newPrices?: Record<string, number> }>(item: T): T => {
    if (isAugust1stOrLater && item.newPrices) {
        return {
            ...item,
            prices: item.newPrices
        };
    }
    return item;
};

export const PRODUCTS = rawPRODUCTS.map(withActivePrices);
export const FLASHINGS = withActivePrices(rawFLASHINGS);
export const BLINDS = rawBLINDS.map(withActivePrices);
export const ACCESSORIES = rawACCESSORIES.map(withActivePrices);

