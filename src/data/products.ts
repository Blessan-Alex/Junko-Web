export interface Product {
    id: string;
    name: string;
    category: string;
    subcategory?: string;
    description?: string;
    image?: string;
    featured?: boolean;
    specs?: Record<string, string>;
}

export interface Category {
    name: string;
    subcategories: string[];
}

export const featuredProducts: Product[] = [
    {
        id: 'fischbein-model-100',
        name: 'Fischbein Model 100',
        category: 'Bag Closing Machines',
        subcategory: 'Machine Heads',
        description: 'Heavy-duty industrial bag closing machine head for high-volume production lines. Known for reliability and durability in harsh environments.',
        image: '/products/fischbein-model-100.png',
        featured: true,
        specs: {
            'Speed': '1900 rpm',
            'Stitch Type': 'Double Thread Chain Stitch',
            'Lubrication': 'Automatic Oil Bath'
        }
    },
    {
        id: 'frb-770i',
        name: 'FRB-770I Band Sealer',
        category: 'Sealing Machines',
        subcategory: 'Band Sealers',
        description: 'Continuous band sealer suitable for sealing all types of plastic materials and bags. Features adjustable speed and temperature control.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp0o6xTtI-hxSOUuB5Xg5Ak2j49x6RGKBVK8ErxxxPDlT7mUyQNIpIgqcwgQ_R4hZV05r0x324hoBOOU5kx60LyNA7KfCV9gYaw1suin7V9jedV8Vzr8sA_-fL3xRD9znLvHK6VgqE0_tuKSnNPMtV3VVsTvrWGT-4ZeMNzubul87VqNeiecl5hAhoiyAdNTc-Ze0kzwIYNyeR-yH1MSCFHJ7CrmpubSxBaPRzxuludeyhAVth51XIyZsDbyB15Y44qZopDdh0_cs',
        featured: true,
        specs: {
            'Sealing Speed': '0-16 m/min',
            'Sealing Width': '10mm',
            'Temp Range': '0-300°C'
        }
    },
    {
        id: 'ac-robot-palletizer',
        name: 'RoboPalletizer System',
        category: 'Filling and Packing Machines',
        subcategory: 'Automation',
        description: 'Advanced robotic palletizing solution for automated end-of-line packaging. Increases throughput and reduces manual labor.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV-xasBYt1b1UV23xGPOCGLNMLRcwiH6WLWVyVZDlm71Qr-Wllj1XAeEWj-RuDxtvtqQTgaXd0E4XDjyClh54A4XL1uFcwIgzVstC_NDctNUDyCfq-K_peGraTu8wAFak6WBxEH5FtOnoMy6pdN9npNHHTIuvWcUj9UgEtVohUZ8tHnxc8B0cNzP2xBBnZd_H6LwY4JxnILM-5wc1SkTjFqIWN6Cn-BgQ42W0anYDx0zX8X_e54BnFltMjjoAJihSJTn9k4r8srGg',
        featured: true,
        specs: {
            'Payload': 'Up to 100kg',
            'Reach': '2200mm',
            'Cycles': 'Up to 15/min'
        }
    },
    {
        id: 'np-7a-portable',
        name: 'NP-7A Portable Closer',
        category: 'Portable Bag Closers',
        subcategory: 'Single Needle',
        description: 'The industry standard portable bag closing machine. Lightweight, robust, and easy to operate for closing paper, jute, and poly bags.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4F2CLdOhEBrl-wgeQPcWqbsYEOByuwyYOHd-D5KX9zdvL0JjhQsnayW7tag0qJ69_20mA677aJMCFc9EiXdU0aMdC5cXDVm3I1IMsxVy98993qf1_amNOHKlRndFNEPd83AQjeEw715B5FLweatUpRoVq1LGUSkmuzUcie3tLKRIa4MQHIzwuFV4q30DdDkPJiFn-LxTIB-B9oNuHF-U-JmO0OZWNLAh53xUrJPwXrUhS4wHRmOKV40m5tgZtAb0_uPkxWkSkixE',
        featured: true,
        specs: {
            'Speed': '1700 rpm',
            'Weight': '5.5 kg',
            'Stitch Length': '8.5 mm (fixed)'
        }
    },
    {
        id: 'cjd-25iiz',
        name: 'CJD-25IIZ Weighing System',
        category: 'Filling and Packing Machines',
        subcategory: 'Weighing & Filling',
        description: 'Automatic weighing and filling machine designed for granular products. Ensures high precision and consistent bagging weights.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa3MjFOxSZbzD5wOGZ70v2zjfq-kaz0TzdIamcuULnCDigjnooe9PEiYc19dOuvksOkHWCQUDnQnv2BI6ocorh51jaKYONTSjwRoFXXq3VuSBS0Y_Fh3kLYol5yz3uvg9HJ92CxpkZILxOyEEQyeX3RpmmZajVaE67FJKMBMc8YJUZeVGEB1KjocmVQVJ3dKZ1Rm1rxbmwY4w72PQBTZbmiJa8WjqS31OhvdMPOrgBiPZunq81-7loR4MrkcbdomJdrSgBmNKlAbk',
        featured: true,
        specs: {
            'Capacity': '10-50kg',
            'Accuracy': '±0.2%',
            'Output': '300-600 bags/hr'
        }
    },
    {
        id: 'titan-2500ahc',
        name: 'TITAN 2500AHC',
        category: 'Carpet Overedging Machines',
        subcategory: 'Heavy Duty',
        description: 'Specialized carpet overedging machine for heavy duty applications. Handles thick carpets and rugs with ease.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWwcFGxf8Nz5TbMYhT8OtteDTn_Y7g3hP_92WnFNytw3Vg9qDjc7_FvAXR8Hx8OZWiTAWbA16Jbvg343iiyz4Vtj390Ep1oAns7qfBG4_NHsGp0O_E0f4FwDnIc9apAdwilpOQlo5l0FxnpRLJBGy6YoPaysSTsXyL8PsF7RAlqeGmaZW8KvtLnQydzGogFACnZitzKh-kJEfOeOJYmo8szSMiwFkrFg5nolgOjkh2oRdKO-XxpPmOp_w-HQev7JpwN_IaBtjP4sk',
        featured: true,
        specs: {
            'Speed': '3000 rpm',
            'Stitch Width': '10-12mm',
            'Material Thickness': 'Up to 15mm'
        }
    }
];

export const allProducts: Product[] = [
    ...featuredProducts,
    // --- BAG CLOSING MACHINES ---
    { id: 'fbk-332c', name: 'FBK-332C', category: 'Bag Closing Machines', subcategory: 'Bag Closing Machine Systems' },
    { id: 'fbk-24d', name: 'FBK-24D', category: 'Bag Closing Machines', subcategory: 'Bag Closing Machine Systems' },
    { id: 'ds-9c', name: 'DS-9C', category: 'Bag Closing Machines', subcategory: 'Bag Closing Machine Systems' },
    { id: 'gk-35-2c', name: 'GK-35 2C', category: 'Bag Closing Machines', subcategory: 'Bag Closing Machine Systems' },
    { id: 'ds-9a', name: 'DS-9A', category: 'Bag Closing Machines', subcategory: 'Bag Closing Machine Systems' },
    { id: '80800-rl', name: '80800 RL', category: 'Bag Closing Machines', subcategory: 'Bag Closing Machine Systems' },
    { id: 'a1-pb-ds-9c', name: 'Bag Closing Machine A1 PB – DS 9C', category: 'Bag Closing Machines', subcategory: 'Bag Closing Machine Systems' },
    { id: 'a1-pb', name: 'Bag Closing Machine A1-PB', category: 'Bag Closing Machines', subcategory: 'Bag Closing Machine Systems' },
    { id: 'gk-l26', name: 'GK-L26', category: 'Bag Closing Machines', subcategory: 'Bag Closing Machine Systems' },
    { id: 'a1-p-ds-2ii', name: 'A1-P (DS-2II)', category: 'Bag Closing Machines', subcategory: 'Bag Closing Machine Systems' },
    { id: 'mw-6-5', name: 'MW-6.5', category: 'Bag Closing Machines', subcategory: 'Bag Closing Machine Systems' },
    { id: 'fn600a', name: 'FN600A', category: 'Bag Closing Machines', subcategory: 'Bag Closing Machine Systems' },
    { id: 'gk35-6c', name: 'GK35-6C', category: 'Bag Closing Machines', subcategory: 'Bag Closing Machine Systems' },
    { id: 'gk35-6a', name: 'GK35-6A', category: 'Bag Closing Machines', subcategory: 'Bag Closing Machine Systems' },
    { id: '80800-c', name: '80800 C', category: 'Bag Closing Machines', subcategory: 'Bag Closing Machine Systems' },
    { id: 'newlong-ds-7c', name: 'Newlong Industrial DS-7C', category: 'Bag Closing Machines', subcategory: 'Bag Closing Machine Systems' },
    { id: 'ind-stitching-paper', name: 'Industrial Stitching Bag Packaging Machine (Paper)', category: 'Bag Closing Machines', subcategory: 'Bag Closing Machine Systems' },

    // Machine Heads (Some duplicates here as per list, but we list them as products)
    { id: 'head-ds-9c', name: 'DS-9C Head', category: 'Bag Closing Machines', subcategory: 'Machine Heads' },
    { id: 'head-fischbein-100', name: 'Fischbein Model 100 Head', category: 'Bag Closing Machines', subcategory: 'Machine Heads' },

    // Bag Making
    { id: 'u561', name: 'U561', category: 'Bag Closing Machines', subcategory: 'Bag Making Machines' },
    { id: 'dn-2hs', name: 'DN-2HS', category: 'Bag Closing Machines', subcategory: 'Bag Making Machines' },
    { id: 'dkn-3gp', name: 'DKN-3GP', category: 'Bag Closing Machines', subcategory: 'Bag Making Machines' },
    { id: 'high-speed-pappu', name: 'High Speed Bag Making Machine (Pappu)', category: 'Bag Closing Machines', subcategory: 'Bag Making Machines' },
    { id: 'as-502-hd', name: 'AS 502 HD', category: 'Bag Closing Machines', subcategory: 'Bag Making Machines' },
    { id: 'as-102-hs', name: 'AS 102 HS', category: 'Bag Closing Machines', subcategory: 'Bag Making Machines' },

    // Conveyors
    { id: 'belt-conveyor', name: 'Belt Conveyor', category: 'Bag Closing Machines', subcategory: 'Conveyors' },

    // Feeding Devices
    { id: 'cp4900', name: 'CP4900', category: 'Bag Closing Machines', subcategory: 'Feeding Devices' },
    { id: 'cm4900-3', name: 'CM4900-3', category: 'Bag Closing Machines', subcategory: 'Feeding Devices' },

    // --- BAG CLOSING THREAD ---
    { id: 'poly-thread-silicone', name: '100% Polyester 3–7% Silicone Treated Thread', category: 'Bag Closing Thread' },
    { id: 'poly-thread', name: '100% Polyester Bag Closing Thread', category: 'Bag Closing Thread' },
    { id: 'sewing-thread', name: 'Sewing Thread', category: 'Bag Closing Thread' },
    { id: 'pp-multi-yarn', name: 'Polypropylene Multifilament Yarn', category: 'Bag Closing Thread' },
    { id: 'mono-yarn', name: 'Monofilament Yarn', category: 'Bag Closing Thread' },
    { id: 'crepe-tape', name: 'Crepe Paper Tape', category: 'Bag Closing Thread' },

    // --- CARPET OVEREDGING ---
    { id: 'rpe-2500', name: 'RPE 2500 (External Stitch Density Adjuster)', category: 'Carpet Overedging Machines' },
    { id: 'titan-2500ahc-3', name: 'TITAN 2500AHC/3', category: 'Carpet Overedging Machines' },
    { id: 'binding-tape-machine', name: 'Carpet Binding Tape Machine', category: 'Carpet Overedging Machines' },
    { id: 'titan-2530ahc', name: 'TITAN 2530AHC', category: 'Carpet Overedging Machines' },
    { id: 'butt-seamer', name: 'Carpet Heavy Duty Butt Seamer', category: 'Carpet Overedging Machines' },
    { id: 'titan-4510che', name: 'TITAN 4510CHE', category: 'Carpet Overedging Machines' },
    { id: 'titan-2200', name: 'TITAN 2200 (Fringing Machine)', category: 'Carpet Overedging Machines' },
    { id: 'movable-overedger', name: 'Movable Carpet Overedging Machine', category: 'Carpet Overedging Machines' },

    // --- CONSUMABLES ---
    { id: 'fischbein-needles', name: 'Fischbein Needles', category: 'Consumables', subcategory: 'Needles' },
    { id: 'groz-beckert-needles', name: 'Groz-Beckert Needles', category: 'Consumables', subcategory: 'Needles' },
    { id: 'organ-needles', name: 'Organ Needles', category: 'Consumables', subcategory: 'Needles' },
    { id: 'schmetz-needles', name: 'Schmetz Needles', category: 'Consumables', subcategory: 'Needles' },
    { id: 'oil', name: 'Sewing Machine Oil', category: 'Consumables', subcategory: 'Others' },
    { id: 'spare-parts', name: 'Spare Parts (on enquiry)', category: 'Consumables', subcategory: 'Services / Parts' },
    { id: 'spring-balancers', name: 'Spring Balancers', category: 'Consumables', subcategory: 'Services / Parts' },

    // --- FILLING AND PACKING ---
    { id: 'cjs-25ih', name: 'CJS-25IH', category: 'Filling and Packing Machines', subcategory: 'Weighing & Filling' },
    { id: 'flg-500a', name: 'FLG-500A', category: 'Filling and Packing Machines', subcategory: 'Weighing & Filling' },
    { id: 'kfg-250', name: 'KFG-250 (Filling Machine)', category: 'Filling and Packing Machines', subcategory: 'Weighing & Filling' },

    { id: 'bsl-5045l', name: 'BSL-5045L', category: 'Filling and Packing Machines', subcategory: 'Shrink Packaging' },
    { id: 'bsf-5540a', name: 'BSF-5540A', category: 'Filling and Packing Machines', subcategory: 'Shrink Packaging' },
    { id: 'bs-4535la', name: 'BS-4535LA', category: 'Filling and Packing Machines', subcategory: 'Shrink Packaging' },

    { id: 'fxj-4040a', name: 'FXJ-4040A', category: 'Filling and Packing Machines', subcategory: 'Carton Sealers' },
    { id: 'fxj-5050a', name: 'FXJ-5050A', category: 'Filling and Packing Machines', subcategory: 'Carton Sealers' },
    { id: 'fxj-8070b', name: 'FXJ-8070B', category: 'Filling and Packing Machines', subcategory: 'Carton Sealers' },

    { id: 'kzb-1', name: 'KZB-1', category: 'Filling and Packing Machines', subcategory: 'Strapping Machines' },
    { id: 'kzb-a', name: 'KZB-A', category: 'Filling and Packing Machines', subcategory: 'Strapping Machines' },
    { id: 'kz-8060-d', name: 'KZ-8060/D', category: 'Filling and Packing Machines', subcategory: 'Strapping Machines' },

    // --- PACKAGING MATERIALS ---
    { id: 'bopp-tape', name: 'BOPP Tape', category: 'Packaging Materials' },
    { id: 'polycord', name: 'Polycord', category: 'Packaging Materials' },
    { id: 'polylash', name: 'Polylash', category: 'Packaging Materials' },
    { id: 'polystrap', name: 'Polystrap', category: 'Packaging Materials' },
    { id: 'polytex', name: 'Polytex', category: 'Packaging Materials' },

    // --- PACKAGING TOOLS ---
    { id: 'prem-strap-tens', name: 'Premium Strapping Tensioner', category: 'Packaging Tools', subcategory: 'Strapping Tools' },
    { id: 'cord-strap-tens', name: 'Cord Strapping Tensioner', category: 'Packaging Tools', subcategory: 'Strapping Tools' },
    { id: 'poly-strap-tens', name: 'Polyester Strapping Tensioner', category: 'Packaging Tools', subcategory: 'Strapping Tools' },
    { id: 'hd-poly-strap-tens', name: 'Heavy Duty Poly Strap Tensioner', category: 'Packaging Tools', subcategory: 'Strapping Tools' },
    { id: 'hd-cord-strap-tens', name: 'Heavy Duty Cord Strapping Tensioner', category: 'Packaging Tools', subcategory: 'Strapping Tools' },

    { id: 'jwc-sealer', name: 'JWC Poly Strapping Sealer', category: 'Packaging Tools', subcategory: 'Sealers & Powered Tools' },
    { id: 'strap-sealer', name: 'Strapping Sealer', category: 'Packaging Tools', subcategory: 'Sealers & Powered Tools' },
    { id: 'pneu-cord-tens', name: 'Pneumatic Cord Strapping Tensioner', category: 'Packaging Tools', subcategory: 'Sealers & Powered Tools' },
    { id: 'pneu-strap-tool', name: 'Pneumatic Strapping Tool', category: 'Packaging Tools', subcategory: 'Sealers & Powered Tools' },
    { id: 'batt-strap-tool', name: 'Battery Operated Strapping Tool', category: 'Packaging Tools', subcategory: 'Sealers & Powered Tools' },

    // --- PORTABLE BAG CLOSERS ---
    { id: 'np-7a', name: 'NP-7A', category: 'Portable Bag Closers', subcategory: 'Single Needle, Single Thread' },
    { id: 'gk-26-1a', name: 'GK 26-1A', category: 'Portable Bag Closers', subcategory: 'Single Needle, Single Thread' },
    { id: 'gnp-7a', name: 'GNP-7A', category: 'Portable Bag Closers', subcategory: 'Single Needle, Single Thread' },
    { id: 'da-c', name: 'DA-C', category: 'Portable Bag Closers', subcategory: 'Single Needle, Single Thread' },
    { id: 'da-model', name: 'DA', category: 'Portable Bag Closers', subcategory: 'Single Needle, Single Thread' },
    { id: 'fischbein-f', name: 'Fischbein Model F', category: 'Portable Bag Closers', subcategory: 'Single Needle, Single Thread' },
    { id: 'l-1', name: 'L-1', category: 'Portable Bag Closers', subcategory: 'Single Needle, Single Thread' },
    { id: 'kp2701', name: 'KP2701', category: 'Portable Bag Closers', subcategory: 'Single Needle, Single Thread' },
    { id: 'da-6', name: 'DA-6', category: 'Portable Bag Closers', subcategory: 'Single Needle, Single Thread' },
    { id: 'da-tex', name: 'DA-TEX', category: 'Portable Bag Closers', subcategory: 'Single Needle, Single Thread' },
    { id: 'gk-9-2', name: 'GK 9-2', category: 'Portable Bag Closers', subcategory: 'Single Needle, Single Thread' },
    { id: 'np-7h', name: 'NP-7H', category: 'Portable Bag Closers', subcategory: 'Single Needle, Single Thread' },
    { id: 'np-7a-crepe', name: 'NP-7A with Crepe Tape Attachment', category: 'Portable Bag Closers', subcategory: 'Single Needle, Single Thread' },

    { id: 'n600a', name: 'N600A-12V-BTN', category: 'Portable Bag Closers', subcategory: 'Battery Operated' },
    { id: 'kp-2701b', name: 'KP-2701B', category: 'Portable Bag Closers', subcategory: 'Battery Operated' },
    { id: 'kp-3000b', name: 'KP-3000B', category: 'Portable Bag Closers', subcategory: 'Battery Operated' },

    { id: 'dad-r', name: 'DAD-R', category: 'Portable Bag Closers', subcategory: 'Double Thread, Single Needle' },
    { id: 'd-2', name: 'D-2', category: 'Portable Bag Closers', subcategory: 'Double Thread, Single Needle' },
    { id: 'np-311', name: 'NP-311', category: 'Portable Bag Closers', subcategory: 'Double Thread, Single Needle' },
    { id: '2200a', name: '2200A', category: 'Portable Bag Closers', subcategory: 'Double Thread, Single Needle' },

    { id: 'de-da6', name: 'DE-DA6', category: 'Portable Bag Closers', subcategory: 'Double Thread, Double Needle' },
    { id: 'n620a', name: 'N620A', category: 'Portable Bag Closers', subcategory: 'Double Thread, Double Needle' },
    { id: 'de-da', name: 'DE-DA', category: 'Portable Bag Closers', subcategory: 'Double Thread, Double Needle' },

    // --- SEALING MACHINES ---
    { id: 'impulse-sealer', name: 'Hand Impulse Sealer', category: 'Sealing Machines', subcategory: 'Impulse Sealers' },
    { id: 'impulse-sealer-cutter', name: 'Hand Impulse Sealer with Cutter', category: 'Sealing Machines', subcategory: 'Impulse Sealers' },
    { id: 'impulse-sealer-large', name: 'Hand Impulse Sealer (600/800/1000 mm)', category: 'Sealing Machines', subcategory: 'Impulse Sealers' },
    { id: 'pedal-sealer', name: 'Pedal Impulse Sealer', category: 'Sealing Machines', subcategory: 'Impulse Sealers' },
    { id: 'table-pedal-sealer', name: 'Table Style Pedal Impulse Sealer', category: 'Sealing Machines', subcategory: 'Impulse Sealers' },

    { id: 'frb-770ii', name: 'FRB-770II (Continuous)', category: 'Sealing Machines', subcategory: 'Band Sealers' },
    { id: 'frm-1120w', name: 'FRM-1120W', category: 'Sealing Machines', subcategory: 'Band Sealers' },
    { id: 'frm-1120ld', name: 'FRM-1120LD', category: 'Sealing Machines', subcategory: 'Band Sealers' },
    { id: 'fr-1370l-t', name: 'FR-1370L/T', category: 'Sealing Machines', subcategory: 'Band Sealers' },
    { id: 'fr-1370ld', name: 'FR-1370LD', category: 'Sealing Machines', subcategory: 'Band Sealers' },

    { id: 'qf-600l', name: 'QF-600L(S) (Pneumatic Heavy Bag Sealer)', category: 'Sealing Machines', subcategory: 'Heavy Duty & Specialty' },
    { id: 'fbh-32', name: 'FBH-32 (Heavy Duty Bag Sealer)', category: 'Sealing Machines', subcategory: 'Heavy Duty & Specialty' },

    { id: 'xbf-750', name: 'XBF-750 (Blister Pack Heat Sealer)', category: 'Sealing Machines', subcategory: 'Blister & Coding' },
    { id: 'frm-810i', name: 'FRM-810I (Solid Ink Coding)', category: 'Sealing Machines', subcategory: 'Blister & Coding' },
    { id: 'frm-1010iii', name: 'FRM-1010III (Solid Ink Coding)', category: 'Sealing Machines', subcategory: 'Blister & Coding' },

    { id: 'fxj-5050qs', name: 'FXJ-5050QS (Carton Sealer)', category: 'Sealing Machines', subcategory: 'Vacuum & Carton' },
    { id: 'hvr-320a', name: 'HVR-320A (Vacuum Packaging Machine)', category: 'Sealing Machines', subcategory: 'Vacuum & Carton' },

    // --- WEIGHING SCALES ---
    { id: 'animal-scale', name: 'Animal Scale', category: 'Weighing Scales', subcategory: 'Electronic' },
    { id: 'pallet-scale', name: 'Pallet Scale', category: 'Weighing Scales', subcategory: 'Electronic' },
    { id: 'platform-scale', name: 'Platform Type Scale', category: 'Weighing Scales', subcategory: 'Electronic' },
    { id: 'heavy-platform', name: 'Heavy Platform Scale', category: 'Weighing Scales', subcategory: 'Electronic' },
    { id: 'price-scale', name: 'Price Computing Scale', category: 'Weighing Scales', subcategory: 'Electronic' },
    { id: 'mini-bench', name: 'Mini Bench Model', category: 'Weighing Scales', subcategory: 'Electronic' },
    { id: 'bench-platform', name: 'Bench Platform Scale', category: 'Weighing Scales', subcategory: 'Electronic' },
    { id: 'table-top', name: 'Table Top Scale', category: 'Weighing Scales', subcategory: 'Electronic' },
    { id: 'waterproof-scale', name: 'Table Top Waterproof Scale', category: 'Weighing Scales', subcategory: 'Electronic' },
    { id: 'hand-pallet-truck', name: 'Hand Pallet Truck', category: 'Weighing Scales', subcategory: 'Mechanical' },
    { id: 'manual-platform', name: 'Manual Platform Scale', category: 'Weighing Scales', subcategory: 'Mechanical' },
    { id: 'counter-scale', name: 'Counter Weighing Scale', category: 'Weighing Scales', subcategory: 'Mechanical' },
];

export const productsByCategory = allProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
        acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
}, {} as Record<string, Product[]>);

export const categories: Category[] = [
    { name: 'Bag Closing Machines', subcategories: ['Bag Closing Machine Systems', 'Machine Heads', 'Bag Making Machines', 'Conveyors', 'Feeding Devices'] },
    { name: 'Portable Bag Closers', subcategories: ['Single Needle, Single Thread', 'Battery Operated', 'Double Thread, Single Needle', 'Double Thread, Double Needle'] },
    { name: 'Sealing Machines', subcategories: ['Impulse Sealers', 'Band Sealers', 'Heavy Duty & Specialty', 'Blister & Coding', 'Vacuum & Carton'] },
    { name: 'Filling and Packing Machines', subcategories: ['Weighing & Filling', 'Shrink Packaging', 'Carton Sealers', 'Strapping Machines'] },
    { name: 'Weighing Scales', subcategories: ['Electronic', 'Mechanical'] },
    { name: 'Carpet Overedging Machines', subcategories: ['Heavy Duty', 'Standard'] },
    { name: 'Packaging Tools', subcategories: ['Strapping Tools', 'Sealers & Powered Tools'] },
    { name: 'Packaging Materials', subcategories: [] },
    { name: 'Bag Closing Thread', subcategories: [] },
    { name: 'Consumables', subcategories: ['Needles', 'Others', 'Services / Parts'] },
];
