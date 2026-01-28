export interface Product {
    id: string;
    name: string;
    category: string;
    subcategory?: string;
    description?: string;
    image: string;
    specs?: Record<string, string>;
    features?: string[];
    featured?: boolean;
}

export interface Category {
    name: string;
    subcategories: string[];
}

export const categories: Category[] = [
    {
        "name": "BAG CLOSING MACHINES",
        "subcategories": [
            "General",
            "Bag closing machine systems",
            "Bag making machines",
            "Conveyors",
            "Feeding device",
            "Machine heads"
        ]
    },
    {
        "name": "BAG CLOSING THREADS",
        "subcategories": [
            "General",
            "Crepe paper tape",
            "Monofilament yarn",
            "Polypropelene multifilament yarn",
            "Sewing thread"
        ]
    },
    {
        "name": "CARPET OVEREDGING MACHINES",
        "subcategories": [
            "General",
            "Carpet binding tape machine",
            "Carpet heavy duty buttseamer",
            "Movable carpet overedging machine",
            "Titan 2200nc, special fringing machine to sew cut or uncut fringes"
        ]
    },
    {
        "name": "CONSUMABLES",
        "subcategories": [
            "General",
            "Crepe paper tape",
            "Needles",
            "Oil for sewing machine",
            "Repairing of machine",
            "Spare parts",
            "Spring balancers",
            "Thread"
        ]
    },
    {
        "name": "FILLING AND PACKING MACHINES",
        "subcategories": [
            "General",
            "Automatic weighing filling machine",
            "Carton sealer",
            "Shrink packaging machine",
            "Strapping machine"
        ]
    },
    {
        "name": "PACKAGING MATERIALS",
        "subcategories": [
            "General"
        ]
    },
    {
        "name": "PACKAGING TOOLS",
        "subcategories": [
            "General",
            "Strapping tools"
        ]
    },
    {
        "name": "PORTABLE BAG CLOSERS",
        "subcategories": [
            "General",
            "Battery operated single needle single thread chain stitch machines",
            "Double thread double needle chain stitch machines",
            "Double thread single needle chain stitch machines",
            "Single needle single thread chain stitch machines"
        ]
    },
    {
        "name": "SEALING MACHINES",
        "subcategories": [
            "General",
            "Band sealers",
            "Blister sealing machine",
            "Carton sealer",
            "Heavy duty bag sealing machine",
            "Impulse sealers",
            "Pneumatic heavy bag sealer",
            "Sealing and stitching packaging machine",
            "Solid ink coding band sealer",
            "Strapping machine",
            "Vaccum packaging machine"
        ]
    },
    {
        "name": "WEIGHING SCALES",
        "subcategories": [
            "General",
            "Electronic weighing scales",
            "Mechanical weighing scales"
        ]
    }
];

export const allProducts: Product[] = [
    {
        "id": "BAG_CLOSING_MACHINES_Bag_closing_machine_systems_80800RL",
        "name": "80800RL",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag closing machine systems",
        "description": "",
        "image": "/products/Bag Closing Machines/bag_closing_machine_systems/80800RL.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_closing_machine_systems_A1_P_DS_2II",
        "name": "A1 P DS 2II",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag closing machine systems",
        "description": "",
        "image": "/products/Bag Closing Machines/bag_closing_machine_systems/A1-P-DS-2II.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_closing_machine_systems_BCM_1",
        "name": "BCM_1",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag closing machine systems",
        "description": "Union Special 80800 C semi-automatic bag closing machine, build for superior performance in both manual and automated bag closing operations. Engineered for durability, this robust machine effortlessly handles various bag sizes with ease, ensuring a seamless workflow every time.\nFeaturing a specialized long curved stitch plate, feeding bags becomes smooth reducing operator strain and increasing efficiency. The innovative two-thread double chain stitch type 401 delivers consistently secure seals, guaranteeing product integrity during transportation and storage.\nThe Semi-automatic machine bag closing machine 80800 C equipped with a horizontal continuously driven knife, precision cutting is achieved effortlessly, resulting in clean and professional finishes with every closure. With the added convenience of start-stop functionality via foot switch, operators can maintain control over the process, enhancing productivity and reducing downtime.\nMTHREADS : 2 Thread\nSTART/STOP : Foot Switch\nWEIGHT : 29kg\nMATERIALS : Burlap Bag, Jute, Paper, PE-Material, PP Laminated Woven Fabric, PP Woven Fabric\nCLOSURE TYPE : Closure with Filler-Cord, Fold Over Closure, Plain Closure\nBAGS PER HOUR : 1000\nBAG FEED-IN : Manual Feed\nSTITCH RANGE : 6.5 – 11mm\nFOOT LIFT : 11mm\nTHREAD CHAIN & TAPE CUTTER : Continuously Driven Nibbler Knife\n\nBCM_3",
        "image": "/products/Bag Closing Machines/bag_closing_machine_systems/BCM_1.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_closing_machine_systems_BCM_2",
        "name": "BCM_2",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag closing machine systems",
        "description": "Working Speed : 1900 RPM.\nStitch Range : 6.5-11 MM\nPresser Foot Lift : 1-16MM\nNeedle : 80800×25#\nCutter System : Manual Nibbler Knife\n\n\nDS-9A",
        "image": "/products/Bag Closing Machines/bag_closing_machine_systems/BCM_2.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_closing_machine_systems_BCM_3",
        "name": "BCM_3",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag closing machine systems",
        "description": "Max. Speed : 1,600rpm\nSeam : Double thread chain stitch\nStitch Width : 7.7mm (self-feeding)\nBag Material : Paper・ＰＰ\nThickness : Paper bag 3P with a tuck\nCutter : Automatic crepe tape cutter\nNeedle : DN-H29 #26\nWeight : 26.0kg\n\nSM-1",
        "image": "/products/Bag Closing Machines/bag_closing_machine_systems/BCM_3.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_closing_machine_systems_BCM_4",
        "name": "BCM_4",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag closing machine systems",
        "description": "Max Speed : 2,700rpm\nSeam : Double Thread Chain Stitch\nStich Width : 7-10.5mm\nBag Material : Paper. PP\nThickness : Paper Bag 4P With a Tuck\nCutter : Automatic Crepe Tape Cutter\nNeedle : DR-H30 #26\nWeight : 41.0Kg\nFeature : Crepe Tape Cutter\n\n\nBCM_7",
        "image": "/products/Bag Closing Machines/bag_closing_machine_systems/BCM_4.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_closing_machine_systems_BCM_5",
        "name": "BCM_5",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag closing machine systems",
        "description": "no descritpon\n\nGK-L26",
        "image": "/products/Bag Closing Machines/bag_closing_machine_systems/BCM_5.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_closing_machine_systems_BCM_6",
        "name": "BCM_6",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag closing machine systems",
        "description": "Bag Closing Machine A1 PB – DS 9C\nIntroducing the A1 PB – DS 9C, a cutting-edge fully automatic height adjustable bag closing system designed for various bag materials including paper, polywoven, jute, or woven cloth. This innovative system, part of the DS 9C series, features an electric lift mechanism activated by a selector switch, ensuring effortless, safe, and reliable adjustments to bag height.\nThis advanced bag closing machine system delivers an attractive and consistent finished product, accommodating both plain sew and crepe-tape bound closures. Equipped with vector drive technology, the A1 PB – DS 9C seamlessly matches speed with existing or Newlong conveyors, providing maximum speed flexibility and enabling swift start/stop sewing action to minimize material costs. Optional add-ons such as automatic infeed devices and conveyors further enhance efficiency and customization possibilities.\nFor automated bag closing needs, the A1 PB – DS 9C offers unparalleled performance, making it an indispensable solution for modern bagging operations.\nRevolution (rpm) : Max.2,700 rpm\nStich Range (mm) : 7~10.5\nOiling System : Automatic oil bath system\nThread : Synthetic resin\nCutter : Pneumatic\nMachine Weight : 320\n\n\nBCM_5",
        "image": "/products/Bag Closing Machines/bag_closing_machine_systems/BCM_6.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_closing_machine_systems_BCM_7",
        "name": "BCM_7",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag closing machine systems",
        "description": "Speed : up to 80 fpm\nMaterial thickness: 8.0 mm\nStitch width : 2.5 SPI adjustable from 2 to 4 SPI\nStitch type : single-needle, double thread chain stitch, Federal Type 401 locking stitch\nStop/start : micro-switch\nNet weight : 57 lbs. (26 kg)\nSelf-lubricating\n\n\nBCM_2",
        "image": "/products/Bag Closing Machines/bag_closing_machine_systems/BCM_7.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_closing_machine_systems_DS_9A",
        "name": "DS-9A",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag closing machine systems",
        "description": "High Speed Bag Closing Machine Head with mechanically operated cutter (Single Needle, Double Thread Chain Stitch Machine).\n\nMax Speed : 2,700 rpm\n\nSeam : Double Thread Chain Stitch\n\nStitch width : 7-11.5mm\n\nBag Material : Paper. PP\n\nThickness : Paper bag 4P with a Tuck\n\nNeedle : DR-H30 \\#26",
        "image": "/products/Bag Closing Machines/bag_closing_machine_systems/DS-9A.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_closing_machine_systems_FBK_24D",
        "name": "FBK-24D",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag closing machine systems",
        "description": "Next",
        "image": "/products/Bag Closing Machines/bag_closing_machine_systems/FBK-24D.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_closing_machine_systems_FBK_332C",
        "name": "FBK-332C",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag closing machine systems",
        "description": "FBK series one-lined sealing and stitching automatic packaging machine, fit for packing single layer Kraft paper, multi-layer Kraft paper, paper/plastic laminated bag\n\nSealing and Stitching Automatic Packaging Machine",
        "image": "/products/Bag Closing Machines/bag_closing_machine_systems/FBK-332C.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_closing_machine_systems_FN600A",
        "name": "FN600A",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag closing machine systems",
        "description": "Pedestal for NP-7A, The pedestal is adjustable up to 85cm suitable for a variety of size of bags. Track length 120cm.\n\nSliding plate with grooved wheels for easy motion.\n\nTrack is constructed of heavy-grooved angle iron with rigid cross-brakes to prevent slippage occurred.\n\nFoot Switch controls sewing head to start and stop., Made in Taiwan",
        "image": "/products/Bag Closing Machines/bag_closing_machine_systems/FN600A.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_closing_machine_systems_GK_L26",
        "name": "GK-L26",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag closing machine systems",
        "description": "Pedestal for NP-7A, Portable Bag Closer with Sliding board.\n\nThe pedestal is adjustable up to 85cm suitable for a variety of size of bags. Track length 120cm.\n\nSliding plate with grooved wheels for easy motion.\n\nTrack is constructed of heavy-grooved angle iron with rigid cross-brakes to prevent slippage occurred.\n\nFoot Switch controls sewing head to start and stop.",
        "image": "/products/Bag Closing Machines/bag_closing_machine_systems/GK-L26.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_closing_machine_systems_GK35_6C",
        "name": "GK35-6A",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag closing machine systems",
        "description": "The GK35-6AW bag sewing machine is a double-needle and four-thread machine developed on the basis of the GK35-6A bag sewing machine. It can sew two stitches at the same time, effectively preventing material leakage. Moreover, the needle spacing and row spacing are consistent, improving Improve work efficiency.\nSewing Speed: 0-1900 rpm\nWorking Speed: 0-1700 rpm\nSewing Thickness: 0-8mm\nStitch Adjustment Range: 6.5-11mm\nSewing Stitch Type: double chain type (401)\nNeedle Model: 80800 (200-250#)\n\n\n80800 C",
        "image": "/products/Bag Closing Machines/bag_closing_machine_systems/GK35-6C.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_closing_machine_systems_MW_6_5",
        "name": "MW-6.5",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag closing machine systems",
        "description": "NP-7A with Spring Balancer",
        "image": "/products/Bag Closing Machines/bag_closing_machine_systems/MW-6.5.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_closing_machine_systems_SM_1",
        "name": "SM-1",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag closing machine systems",
        "description": "Voltage(V/Hz) : AC 380/50\n\nGross Power(KW : 5\n\nTransmission Power(KW) : 0.75\n\nMotor Power of Sewing Machine(KW) : 0.37\n\nHeating Power(KW) : 0.5×6\n\nDeduster Power(KW) : 0.75\n\nSealing Speed(m/min) : 8\\. 5(limit 11\\)\n\nTemperature Range(℃) : 0-400\n\nNet Weight(kg) : 500\n\nBelow are the Machine Heads",
        "image": "/products/Bag Closing Machines/bag_closing_machine_systems/SM-1.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_making_machines_AS_102_HS_1_e1709140399614",
        "name": "High Speed Bag Making Machine",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag making machines",
        "description": "1 Needle 2 Thread Chain Stitch Machine\nMaximum Speed : 5000 rpm\nStitch : 4-9.5 mm\nBrand : YaoHan, Made in Taiwan\n\n\nHigh Speed Bag Making Machine (Newlong)",
        "image": "/products/Bag Closing Machines/bag_making_machines/AS-102-HS-1-e1709140399614.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_making_machines_AS_502_HD",
        "name": "High Speed Bag Making Machine",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag making machines",
        "description": "1 Needle 2 Thread Chain Stitch Machine\nMaximum Speed : 5000 rpm\nStitch : 4-9.5 mm\nBrand : YaoHan, Made in Taiwan\n\n\nHigh Speed Bag Making Machine (Newlong)",
        "image": "/products/Bag Closing Machines/bag_making_machines/AS-502-HD.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_making_machines_DKN_3WGP_DKN_3BPGP",
        "name": "High Speed Bag Making Machine",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag making machines",
        "description": "1 Needle 2 Thread Chain Stitch Machine\nMaximum Speed : 5000 rpm\nStitch : 4-9.5 mm\nBrand : YaoHan, Made in Taiwan\n\n\nHigh Speed Bag Making Machine (Newlong)",
        "image": "/products/Bag Closing Machines/bag_making_machines/DKN-3WGP-DKN-3BPGP.jpeg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_making_machines_DN_2HS",
        "name": "DN 2HS",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag making machines",
        "description": "",
        "image": "/products/Bag Closing Machines/bag_making_machines/DN-2HS.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Bag_making_machines_U561",
        "name": "High Speed Bag Making Machine",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Bag making machines",
        "description": "1 Needle 2 Thread Chain Stitch Machine\nMaximum Speed : 5000 rpm\nStitch : 4-9.5 mm\nBrand : YaoHan, Made in Taiwan\n\n\nHigh Speed Bag Making Machine (Newlong)",
        "image": "/products/Bag Closing Machines/bag_making_machines/U561.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Conveyors_Belt_Conveyor_e1709141117967",
        "name": "Belt Conveyor",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Conveyors",
        "description": "The belt conveyor finds wide application across various industries including chemicals, electronics, light industry, foodstuff, and more. Its primary function is transmission and discharge, significantly enhancing working efficiency and reducing labor intensity.\nThe belt conveyor employs a high-quality conveying belt and frequency control technology, offering features such as high loading capacity, durability, adjustable speed, gradual start-up, and shut-down. These attributes make it a reliable and versatile solution for material handling needs in diverse industrial settings.\nWhen paired with Automatic or semiautomatic packaging machine, the belt conveyor becomes the optimal choice, ensuring seamless integration and efficient operation for large-scale packaging tasks.\nBelt Conveyor – 2500 mm / 3000 mm / 4000 mm / 5000 mm\n\n\n\nBag Folding Device",
        "image": "/products/Bag Closing Machines/conveyors/Belt-Conveyor-e1709141117967.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Feeding_device_CM4900_3_e1709141785103",
        "name": "Bag Infeed",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Feeding device",
        "description": "Bag Infeed for Crepe Tape (Mitsubishi Motor)",
        "image": "/products/Bag Closing Machines/feeding_device/CM4900-3-e1709141785103.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Feeding_device_CP4900_e1709141518888",
        "name": "Bag Folding Device",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Feeding device",
        "description": "Bag Folding Device\nMitsubishi Motor\n\n\nBag Infeed for Crepe Tape",
        "image": "/products/Bag Closing Machines/feeding_device/CP4900-e1709141518888.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Machine_heads_80800RL",
        "name": "80800RL",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Machine heads",
        "description": "",
        "image": "/products/Bag Closing Machines/Machine_heads/80800RL.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Machine_heads_BCM_1",
        "name": "BCM_1",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Machine heads",
        "description": "Union Special 80800 C semi-automatic bag closing machine, build for superior performance in both manual and automated bag closing operations. Engineered for durability, this robust machine effortlessly handles various bag sizes with ease, ensuring a seamless workflow every time.\nFeaturing a specialized long curved stitch plate, feeding bags becomes smooth reducing operator strain and increasing efficiency. The innovative two-thread double chain stitch type 401 delivers consistently secure seals, guaranteeing product integrity during transportation and storage.\nThe Semi-automatic machine bag closing machine 80800 C equipped with a horizontal continuously driven knife, precision cutting is achieved effortlessly, resulting in clean and professional finishes with every closure. With the added convenience of start-stop functionality via foot switch, operators can maintain control over the process, enhancing productivity and reducing downtime.\nMTHREADS : 2 Thread\nSTART/STOP : Foot Switch\nWEIGHT : 29kg\nMATERIALS : Burlap Bag, Jute, Paper, PE-Material, PP Laminated Woven Fabric, PP Woven Fabric\nCLOSURE TYPE : Closure with Filler-Cord, Fold Over Closure, Plain Closure\nBAGS PER HOUR : 1000\nBAG FEED-IN : Manual Feed\nSTITCH RANGE : 6.5 – 11mm\nFOOT LIFT : 11mm\nTHREAD CHAIN & TAPE CUTTER : Continuously Driven Nibbler Knife\n\nBCM_3",
        "image": "/products/Bag Closing Machines/Machine_heads/BCM_1.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Machine_heads_BCM_2",
        "name": "BCM_2",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Machine heads",
        "description": "Working Speed : 1900 RPM.\nStitch Range : 6.5-11 MM\nPresser Foot Lift : 1-16MM\nNeedle : 80800×25#\nCutter System : Manual Nibbler Knife\n\n\nDS-9A",
        "image": "/products/Bag Closing Machines/Machine_heads/BCM_2.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Machine_heads_BCM_3",
        "name": "BCM_3",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Machine heads",
        "description": "Max. Speed : 1,600rpm\nSeam : Double thread chain stitch\nStitch Width : 7.7mm (self-feeding)\nBag Material : Paper・ＰＰ\nThickness : Paper bag 3P with a tuck\nCutter : Automatic crepe tape cutter\nNeedle : DN-H29 #26\nWeight : 26.0kg\n\nSM-1",
        "image": "/products/Bag Closing Machines/Machine_heads/BCM_3.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Machine_heads_BCM_4",
        "name": "BCM_4",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Machine heads",
        "description": "Max Speed : 2,700rpm\nSeam : Double Thread Chain Stitch\nStich Width : 7-10.5mm\nBag Material : Paper. PP\nThickness : Paper Bag 4P With a Tuck\nCutter : Automatic Crepe Tape Cutter\nNeedle : DR-H30 #26\nWeight : 41.0Kg\nFeature : Crepe Tape Cutter\n\n\nBCM_7",
        "image": "/products/Bag Closing Machines/Machine_heads/BCM_4.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Machine_heads_BCM_7",
        "name": "BCM_7",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Machine heads",
        "description": "Speed : up to 80 fpm\nMaterial thickness: 8.0 mm\nStitch width : 2.5 SPI adjustable from 2 to 4 SPI\nStitch type : single-needle, double thread chain stitch, Federal Type 401 locking stitch\nStop/start : micro-switch\nNet weight : 57 lbs. (26 kg)\nSelf-lubricating\n\n\nBCM_2",
        "image": "/products/Bag Closing Machines/Machine_heads/BCM_7.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Machine_heads_DS_9A",
        "name": "DS-9A",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Machine heads",
        "description": "High Speed Bag Closing Machine Head with mechanically operated cutter (Single Needle, Double Thread Chain Stitch Machine).\n\nMax Speed : 2,700 rpm\n\nSeam : Double Thread Chain Stitch\n\nStitch width : 7-11.5mm\n\nBag Material : Paper. PP\n\nThickness : Paper bag 4P with a Tuck\n\nNeedle : DR-H30 \\#26",
        "image": "/products/Bag Closing Machines/Machine_heads/DS-9A.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_MACHINES_Machine_heads_GK35_6C",
        "name": "GK35-6A",
        "category": "BAG CLOSING MACHINES",
        "subcategory": "Machine heads",
        "description": "The GK35-6AW bag sewing machine is a double-needle and four-thread machine developed on the basis of the GK35-6A bag sewing machine. It can sew two stitches at the same time, effectively preventing material leakage. Moreover, the needle spacing and row spacing are consistent, improving Improve work efficiency.\nSewing Speed: 0-1900 rpm\nWorking Speed: 0-1700 rpm\nSewing Thickness: 0-8mm\nStitch Adjustment Range: 6.5-11mm\nSewing Stitch Type: double chain type (401)\nNeedle Model: 80800 (200-250#)\n\n\n80800 C",
        "image": "/products/Bag Closing Machines/Machine_heads/GK35-6C.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_THREADS_General_3_7_Silicon_Treated_1",
        "name": "3-7_Silicon_Treated-1",
        "category": "BAG CLOSING THREADS",
        "subcategory": "General",
        "description": "Best suited for high speed stitching.\n3-7% silicone treated to withstand high heat during stitching.\nSewing Thread : for Bag Closing Machines\nType : 100% Polyester Thread 3-7% Silicone treated\nSize : 20s/6\nWeight : small/ 1kg/ 2kg/ 4kg\nColor : Natural white/ Red/ Green/ Blue\n\n\n100% Polyester Bag Closing Thread",
        "image": "/products/Bag_closing_threads/3-7_Silicon_Treated-1.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_THREADS_General_Crepe_paper_tape",
        "name": "Crepe Paper Tape",
        "category": "BAG CLOSING THREADS",
        "subcategory": "General",
        "description": "For Bag Closing Machines, for stronger and attractive tape sewn bag closure.\nColors available : Brown and White\nWidth : 50mm/ 70mm\nRoll Diameter: 520mm/ 530mm\nCore Diameter: 25mm/ 50mm\nWeight (White) : 850grams/ 5kg/ 6kg\nWeight (Brown) : 850g/ 4.55kg/ 5kg/ 6kg\nLength : 100m per roll/ 457m per roll\n\n\n\n\nBelow are Thread\n\nBag Closing Thread",
        "image": "/products/Bag_closing_threads/Crepe_paper_tape.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_THREADS_General_Thread_7",
        "name": "100% Polyester Bag Closing Thread",
        "category": "BAG CLOSING THREADS",
        "subcategory": "General",
        "description": "Knot free\nHigh tensile strength\nHigh quality\nLow shrinkage\nSafe for use in food industries\nSewing Thread : for Bag Closing Machines\nType : 100% Polyester\nSize : 20s/6\nWeight : 150g/ 200g/ 250g/ 1kg/ 2kg/ 4kg\nColor : Natural white/ Red/ Green/ Blue\n\nBelow are sewing thread",
        "image": "/products/Bag_closing_threads/Thread_7.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_THREADS_Crepe_paper_tape_Crepe_paper_tape",
        "name": "Crepe Paper Tape",
        "category": "BAG CLOSING THREADS",
        "subcategory": "Crepe paper tape",
        "description": "For Bag Closing Machines, for stronger and attractive tape sewn bag closure.\nColors available : Brown and White\nWidth : 50mm/ 70mm\nRoll Diameter: 520mm/ 530mm\nCore Diameter: 25mm/ 50mm\nWeight (White) : 850grams/ 5kg/ 6kg\nWeight (Brown) : 850g/ 4.55kg/ 5kg/ 6kg\nLength : 100m per roll/ 457m per roll\n\n\n\n\nBelow are Thread\n\nBag Closing Thread",
        "image": "/products/Bag_closing_threads/Crepe Paper Tape/Crepe_paper_tape.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_THREADS_Monofilament_yarn_monofilament_yarn",
        "name": "Monofilament Yarn",
        "category": "BAG CLOSING THREADS",
        "subcategory": "Monofilament yarn",
        "description": "Type : Monofilament Nylon Thread\nSize : 0.3 mm\nWeight : 2kg roll\nColor : Natural white\nFor carpet overedging machine.\n\nBelow are Crepe Paper Tape\n\nCrepe Paper Tape",
        "image": "/products/Bag_closing_threads/Monofilament Yarn/monofilament_yarn.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_THREADS_Polypropelene_multifilament_yarn_Pplypropylene_multifilament",
        "name": "Polypropelene (PP) Multifilament Yarn",
        "category": "BAG CLOSING THREADS",
        "subcategory": "Polypropelene multifilament yarn",
        "description": "Color fastness through dope dyed process U.V stabilized.\nLow moistening characteristic, making it easy to clean.\nExcellent resistance to Alkali and Acids.\nPP Multifilament Yarn : 400-3000\nDenier Range : 5.5 – 6.0 GPD\nTenacity (Strength) : Twist – 70 – 100 TPM\nWeight :  4kg\nColor : White\n\nBelow are Monofilament Yarn\n\nMonofilament Yarn",
        "image": "/products/Bag_closing_threads/Polypropelene Multifilament Yarn/Pplypropylene_multifilament.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "BAG_CLOSING_THREADS_Sewing_thread_Sewing_Thread",
        "name": "Sewing Thread",
        "category": "BAG CLOSING THREADS",
        "subcategory": "Sewing thread",
        "description": "Junko Polyester sewing thread is one kind 100% polyester staple fibre winding thread, using first-class polyester sewing thread raw materials, high-quality textile dyes, with excellent sewing performance. The different thickness of sewing thread for a variety of high-end textile and apparel,  footwear, home textiles and decorative supplies.\nMain Specifications:\nCount : 20s/s, 20s/3, 20s/4, 20s/6, 30s/2, 30s/3, 40s/2, 40s/3, 50s/2, 50s/3, 60s/2, 60s/3, 80s/2 and 80s/3 etc.\nColor: More than 1000 colors are available\nPacking : 1000 yds to 50000 yds/cone, or 80 g to 5.0 kg/cone.\n\n\nBelow are Polypropelene Multifilament Yarn\n\nPolypropelene Multifilament Yarn",
        "image": "/products/Bag_closing_threads/sewing_thread/Sewing_Thread.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "CARPET_OVEREDGING_MACHINES_General_COEM_1_1",
        "name": "RPE 2500 External Stitch Density Adjuster",
        "category": "CARPET OVEREDGING MACHINES",
        "subcategory": "General",
        "description": "The external stitch density adjuster allows to change easily the density of stitches while sewing. This permits the operator to obtain the best covering effect in a short time.\nThe external stitch density adjuster is strongly advised when using different qualities of thread and carpet.\n\nTITAN 2500AHC",
        "image": "/products/Carpet_overedging_machines/COEM_1-1.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "CARPET_OVEREDGING_MACHINES_General_COEM_6",
        "name": "TITAN 2500AHC/3",
        "category": "CARPET OVEREDGING MACHINES",
        "subcategory": "General",
        "description": "OVEREDGING FOR CAR, PLANE AND BOAT MATS WITH 3 THREADS\nSTANDARD 3 THREADS 10 mm OVEREDGING OF CAR MATS, BOAT MATS or AIRPLANE CARPETS\nStitch width: 10 mm\nCarpet thickness: 12 mm\nSpeed: 2800 rpm\n\nBelow are Carpet Binding Tape Machine\n\nTITAN 2530AHC",
        "image": "/products/Carpet_overedging_machines/COEM_6.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "CARPET_OVEREDGING_MACHINES_General_COEM_7",
        "name": "TITAN 2500AHC",
        "category": "CARPET OVEREDGING MACHINES",
        "subcategory": "General",
        "description": "",
        "image": "/products/Carpet_overedging_machines/COEM_7.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "CARPET_OVEREDGING_MACHINES_Carpet_binding_tape_machine_COEM_8",
        "name": "TITAN 2530AHC",
        "category": "CARPET OVEREDGING MACHINES",
        "subcategory": "Carpet binding tape machine",
        "description": "TAPE BINDING FOR CAR MATS\nSews tape around the edge of car mats or bath mats.\n\n\nBelow are Carpet Heavy Duty Buttseamer\n\nTITAN 4510CHE",
        "image": "/products/Carpet_overedging_machines/Carpet Binding Tape Machine/COEM_8.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "CARPET_OVEREDGING_MACHINES_Carpet_heavy_duty_buttseamer_TITAN_4510CHE_1536x678",
        "name": "TITAN 4510CHE",
        "category": "CARPET OVEREDGING MACHINES",
        "subcategory": "Carpet heavy duty buttseamer",
        "description": "This compact and heavy duty buttseamer sewing machine has been developed to work on all types of materials which are up to 20 mm in double layer. The very heavy cutting knifes (UKM/2) are working like scissors , and can take away excess material , and make a clean cut. This machine can also be build in a large rail . With the help of a long belt puller the machine can run on its own from one side to the other. See the pictures below for the layout of this rails. These are made to order in sizes : 2, 3, 4 or 5 meter.\n\n\nBelow are TITAN 2200NC, Special Fringing Machine to sew cut or uncut fringes\n\nTITAN 2200NC",
        "image": "/products/Carpet_overedging_machines/Carpet Heavy Duty Buttseamer/TITAN-4510CHE-1536x678.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "CARPET_OVEREDGING_MACHINES_Movable_carpet_overedging_machine_2502WD_2",
        "name": "2502WD-2",
        "category": "CARPET OVEREDGING MACHINES",
        "subcategory": "Movable carpet overedging machine",
        "description": "1.Suitable for overedging large carpet,blanket and any extra-heavy materials;\n2.Edge cutter, Large Hook, High-speed;\n3.Applicable Industries: Manufacturing Plant, Machinery Repair Shops, Home Use, Other;\nSpecifications\nSpeed: 800 – 1200 r.p.m.\nStitch: 1-10 mm\nHand Side: Right Hand\nN.W: 29 kg\nG.W: 33 kg",
        "image": "/products/Carpet_overedging_machines/Movable Carpet Overedging Machine/2502WD-2.webp",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "CARPET_OVEREDGING_MACHINES_Movable_carpet_overedging_machine_COEM_8",
        "name": "TITAN 2530AHC",
        "category": "CARPET OVEREDGING MACHINES",
        "subcategory": "Movable carpet overedging machine",
        "description": "TAPE BINDING FOR CAR MATS\nSews tape around the edge of car mats or bath mats.\n\n\nBelow are Carpet Heavy Duty Buttseamer\n\nTITAN 4510CHE",
        "image": "/products/Carpet_overedging_machines/Movable Carpet Overedging Machine/COEM_8.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "CARPET_OVEREDGING_MACHINES_Titan_2200nc__special_fringing_machine_to_sew_cut_or_uncut_fringes_TITAN_2200_1536x681",
        "name": "TITAN 2200NC",
        "category": "CARPET OVEREDGING MACHINES",
        "subcategory": "Titan 2200nc, special fringing machine to sew cut or uncut fringes",
        "description": "STANDARD FRINGING MACHINE\nThis standard fringing machine will sew from one (or several) threads a complete fringe on the edge of carpets , blankets or shawls\nLength fringe: 6-10 cm\nCarpet thickness: 10 mm\nSpeed: 800 rpm\n\n\nBelow are Movable Carpet Overedging Machine\n\nMovable Carpet Overedging Machine",
        "image": "/products/Carpet_overedging_machines/TITAN 2200NC, Special Fringing Machine to sew cut or uncut fringes/TITAN-2200-1536x681.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "CONSUMABLES_Crepe_paper_tape_Crepe_paper_tape",
        "name": "Crepe Paper Tape",
        "category": "CONSUMABLES",
        "subcategory": "Crepe paper tape",
        "description": "For Bag Closing Machines, for stronger and attractive tape sewn bag closure.\nColors available : Brown and White\nWidth : 50mm/ 70mm\nRoll Diameter: 520mm/ 530mm\nCore Diameter: 25mm/ 50mm\nWeight (White) : 850grams/ 5kg/ 6kg\nWeight (Brown) : 850g/ 4.55kg/ 5kg/ 6kg\nLength : 100m per roll/ 457m per roll\n\n\n\n\nBelow are Thread\n\nBag Closing Thread",
        "image": "/products/consumables/Crepe paper tape/Crepe_paper_tape.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "CONSUMABLES_Needles_Fischbein_needles",
        "name": "FISCHBEIN Needles",
        "category": "CONSUMABLES",
        "subcategory": "Needles",
        "description": "Fischbein needles are made and imported from USA. Specially designed to handle a variety of bag materials to include multi-wall paper, woven polypropylene, laminated polypropylene, polyester and jute.",
        "image": "/products/consumables/Needles/Fischbein_needles.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "CONSUMABLES_Needles_Groz_beckert_needles_e1708936853463",
        "name": "GROZ-BECKERT Needles",
        "category": "CONSUMABLES",
        "subcategory": "Needles",
        "description": "GROZ-BECKERT Needles are made and imported from Germany. These needles are precision made available in different sizes and varieties for all bag closing and carpet over edging machines.",
        "image": "/products/consumables/Needles/Groz_beckert_needles-e1708936853463.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "CONSUMABLES_Needles_Needle_1_Schmetz",
        "name": "Needle 1 Schmetz",
        "category": "CONSUMABLES",
        "subcategory": "Needles",
        "description": "",
        "image": "/products/consumables/Needles/Needle_1_Schmetz.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "CONSUMABLES_Needles_Organ_Needles",
        "name": "ORGAN Needles",
        "category": "CONSUMABLES",
        "subcategory": "Needles",
        "description": "ORGAN needles are made and imported from Japan. As our most popular brand of needles we have it available in different sizes and varieties for all bag closing and carpet over edging machines.",
        "image": "/products/consumables/Needles/Organ-Needles.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "CONSUMABLES_Oil_for_sewing_machine_SWOil_e1708935103355",
        "name": "SWOil",
        "category": "CONSUMABLES",
        "subcategory": "Oil for sewing machine",
        "description": "No description\n\n\nBelow are Spare Parts\nPLEASE ENQUIRE FOR THE SPARE PARTS OF THESE MACHINES!",
        "image": "/products/consumables/Oil for sewing machine/SWOil-e1708935103355.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "CONSUMABLES_Repairing_of_machine_Repair_Sewing_Machines_e1708967961507",
        "name": "Repair Services",
        "category": "CONSUMABLES",
        "subcategory": "Repairing of machine",
        "description": "No desc , no model name",
        "image": "/products/consumables/Repairing of machine/Repair_Sewing_Machines-e1708967961507.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "CONSUMABLES_Spare_parts_Spare_Parts_Machines",
        "name": "Spare Parts",
        "category": "CONSUMABLES",
        "subcategory": "Spare parts",
        "description": "The spare parts for all of these products are available and can be supplied.\nPlease request for quote for any parts.\n\n\n\nBelow are Spring Balancers",
        "image": "/products/consumables/Spare parts/Spare_Parts_Machines.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "CONSUMABLES_Spring_balancers_spring_balancers_all",
        "name": "Spring Balancer",
        "category": "CONSUMABLES",
        "subcategory": "Spring balancers",
        "description": "We also sell intermediate-duty, heavy-duty, and super-duty spring balancer models to allow users to move tool with minimal effort along cable travel.\nOur Spring Balancers:\nIncrease Productivity\nExtend Tool Life\nReduces Operator Fatigue\nNo Power Requirement\nIncreases Safety.\nCapacities : 0.5-1.5kg, 1.5-3kg, 3-5kg, 5-7kg, 7-9kg, 9-15kg, 15-22kg, 22-30kg, 30-40kg, 40-50kg, 50-60kg, 60-70kg\n\n\nBelow are repairing of machines",
        "image": "/products/consumables/Spring balancers/spring_balancers_all.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "CONSUMABLES_Thread_Thread_Consumers_1536x396",
        "name": "Bag Closing Thread",
        "category": "CONSUMABLES",
        "subcategory": "Thread",
        "description": "We provide high quality threads which are knot free with high tensile strength and low shrinkage which are also safe for use in food industries.\nSewing Thread : for Bag Closing Machines\nType : 100% Polyester\nSize : 20s/6\nWeight : 150g/ 200g/ 250g/ 1kg/ 2kg/ 4kg\nColor : Natural white/ Red/ Green/ Blue\n\nBelow are Oil for Sewing Machine",
        "image": "/products/consumables/Thread/Thread_Consumers-1536x396.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "FILLING_AND_PACKING_MACHINES_Automatic_weighing_filling_machine_FLG_500A",
        "name": "FLG-5000A",
        "category": "FILLING AND PACKING MACHINES",
        "subcategory": "Automatic weighing filling machine",
        "description": "Semi automatic dry powder auger filler is a versatile filling machine ideal for non-free flowing, fluffy & sticky powders e.g. talcum powder, tooth powder, custard powder, pesticide powders, ground spices etc.",
        "image": "/products/Filling and packing machines/Automatic weighing filling machine/FLG-500A.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "FILLING_AND_PACKING_MACHINES_Automatic_weighing_filling_machine_PM_1",
        "name": "CJS-25IH",
        "category": "FILLING AND PACKING MACHINES",
        "subcategory": "Automatic weighing filling machine",
        "description": "Introducing the CJS-25IH Automatic Electronic Weighing and Filling Machine, a pivotal component of heavy-duty bag packaging systems, engineered with state-of-the-art weighing technology. This machine is designed to accurately weigh free-flowing powders and granules, displaying precise values before seamlessly feeding the product into the filling machine for efficient packaging. Whether utilized as a standalone unit or integrated into a production line, it consistently delivers unmatched performance and reliability.\nWith reliable performance, this machine ensures consistent and accurate weighing results, optimizing packaging operations for enhanced productivity. Its user-friendly interface streamlines operation, making it easy for operators to manage and control. Straightforward maintenance procedures minimize downtime, ensuring continuous operation without interruptions. Its versatile design allows for seamless integration into existing production lines, maximizing efficiency and throughput. Plus, precision control and automation provide optimized performance and accuracy in every weighing and filling machine operation.\nBuilt with innovative weighing theory to meet the demands of heavy-duty bag packaging systems, the CJS-25IH is ideal for packaging bulk products across various industries including cereal, feed processing, cement, and chemicals, catering to diverse packaging needs. Suited for installation in spaces with ample room, such as small factories, specialized shops, and workshops, it offers operational flexibility and convenience.\nVoltage (V/Hz) : AC 220/50  110/60\nPower (W)  : 1000\nWeighing Range (kg/bag) : 10～25\nWeighing Speed (bags/h) : 480\nNet Weight (kg) : 350\n\n\nFilling Machine for Powders",
        "image": "/products/Filling and packing machines/Automatic weighing filling machine/PM-1.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "FILLING_AND_PACKING_MACHINES_Automatic_weighing_filling_machine_PM_2",
        "name": "CJD-25IIZ",
        "category": "FILLING AND PACKING MACHINES",
        "subcategory": "Automatic weighing filling machine",
        "description": "Introducing the CJD-25IIZ Automatic Electronic Weighing and Filling Machine, a versatile solution designed to streamline your packaging process. This comprehensive system includes a hopper, vibration feeder, weighing device, weigh hopper, door-opening device, and more, seamlessly integrating with elevators, belt conveyors, and bag sealers/band sealers for efficient production.\nWith reliable performance and user-friendly operation, CJD-25IIZ ensures consistent and accurate results while minimizing downtime with easy maintenance. Its PLC control offers precise automation, optimizing performance for weighing, filling, and sealing processes.\nIdeal for packaging bulk products in various industries like cereal, feed processing, cement, and chemicals, the CJD-25IIZ is suited for industrial environments such as factories and workshops. Upgrade your packaging capabilities and enhance efficiency with this versatile filling machine.\nVoltage (V/Hz) : 380/50 220/60 (3PH)\nGas Source Pressure (kg/cm2) : 6\nWeighing Range (kg/bag) : 25～50\nWeighing Speed (bags/h) : 800\nPacking Bag Size (mm) : Bag top width 400～600  Bag length 700～950\n\n\nCJS-25IH",
        "image": "/products/Filling and packing machines/Automatic weighing filling machine/PM-2.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "FILLING_AND_PACKING_MACHINES_Automatic_weighing_filling_machine_PM_4",
        "name": "PM-4",
        "category": "FILLING AND PACKING MACHINES",
        "subcategory": "Automatic weighing filling machine",
        "description": "Voltage (V/Hz) : AC 220/50 110/60\nPower (W) : 200\nPacking Capacity (ml) : 50-250\nCapacity (bags/min) : 50\nExternal Dimensions(L×W×H) (mm) : 650×450×1600\nNet Weight (kg) : 100\n\nBelow are Shrink Packaging Machine",
        "image": "/products/Filling and packing machines/Automatic weighing filling machine/PM-4.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "FILLING_AND_PACKING_MACHINES_Carton_sealer_FXJ_4040A",
        "name": "FXJ-4040A",
        "category": "FILLING AND PACKING MACHINES",
        "subcategory": "Carton sealer",
        "description": "● FXJ series is designed to seal carton by applying adhesive tape\n● Cost effective, High speed\n● Easy size changeovers\n\nHeavy Carton Sealing Machine",
        "image": "/products/Filling and packing machines/carton sealer/FXJ-4040A.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "FILLING_AND_PACKING_MACHINES_Carton_sealer_FXJ_5050A",
        "name": "FXJ-5050A",
        "category": "FILLING AND PACKING MACHINES",
        "subcategory": "Carton sealer",
        "description": "FXJ-5050A are operator fed and designed for heavy duty applications.\nThese machines are reliable, cost-effective and durable providing savings to your production process.\n\nCarton Box Closing Machine",
        "image": "/products/Filling and packing machines/carton sealer/FXJ-5050A.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "FILLING_AND_PACKING_MACHINES_Carton_sealer_FXJ_8070B",
        "name": "FXJ-8070B",
        "category": "FILLING AND PACKING MACHINES",
        "subcategory": "Carton sealer",
        "description": "The two heads simultaneously apply a strip of tape taping above and below the box.\nIdeal for close boxes high and narrow.\n\nBelow are Strapping Machine\n\nHigh Table Semi Automatic Strapping Machine",
        "image": "/products/Filling and packing machines/carton sealer/FXJ-8070B.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "FILLING_AND_PACKING_MACHINES_Shrink_packaging_machine_BS_4535LA",
        "name": "BS-4535LA",
        "category": "FILLING AND PACKING MACHINES",
        "subcategory": "Shrink packaging machine",
        "description": "The shrink tunnel BS-4535LA supplies heated air to an enclosed chamber with the purpose of shrinking a polymeric film around a package.\n\n2 in 1 Sealing and Shrinking Machines",
        "image": "/products/Filling and packing machines/Shrink Packaging Machine/BS-4535LA.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "FILLING_AND_PACKING_MACHINES_Shrink_packaging_machine_BSF_5540A",
        "name": "BSF-5540A",
        "category": "FILLING AND PACKING MACHINES",
        "subcategory": "Shrink packaging machine",
        "description": "This machine is used for shrinking parcel. Three steps are done in this machine which is sealing, shrinking and transferring the parcel out of the cabin using rails and it is good for packaging food ,pharmaceutical, cosmetics and plastic products.\n\nShrink Tunnel Machine",
        "image": "/products/Filling and packing machines/Shrink Packaging Machine/BSF-5540A.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "FILLING_AND_PACKING_MACHINES_Shrink_packaging_machine_BSL_5045L",
        "name": "BSL-5045L",
        "category": "FILLING AND PACKING MACHINES",
        "subcategory": "Shrink packaging machine",
        "description": "Shrink Tunnel Machine",
        "image": "/products/Filling and packing machines/Shrink Packaging Machine/BSL-5045L.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "FILLING_AND_PACKING_MACHINES_Strapping_machine_KZ_8060D",
        "name": "KZ-8060/D",
        "category": "FILLING AND PACKING MACHINES",
        "subcategory": "Strapping machine",
        "description": "● Easy to install and maintain. Gives quiet running performance\n● Programmable Logic Controller – Controls correct voltage and operation no matter what the condition of the power supply.",
        "image": "/products/Filling and packing machines/Strapping machine/KZ-8060D.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "FILLING_AND_PACKING_MACHINES_Strapping_machine_KZB_1",
        "name": "KZB-1",
        "category": "FILLING AND PACKING MACHINES",
        "subcategory": "Strapping machine",
        "description": "Our KZB-I semi-automatic strapping machine is a general purpose strapping machine that can strap packages quickly and efficiently.\nStrapping cycle will automatically start when operator inserts strap.\n\nManual Box Strapping Machine",
        "image": "/products/Filling and packing machines/Strapping machine/KZB-1.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "FILLING_AND_PACKING_MACHINES_Strapping_machine_KZB_A",
        "name": "KZB-A",
        "category": "FILLING AND PACKING MACHINES",
        "subcategory": "Strapping machine",
        "description": "The KZB-A Machine is a general purpose strapping machine that can strap packages quickly and efficiently.\n\nAutomatic Strap Machine",
        "image": "/products/Filling and packing machines/Strapping machine/KZB-A.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PACKAGING_MATERIALS_General_brown_packaging_tape_500x500_1",
        "name": "brown-packaging-tape-500x500-1",
        "category": "PACKAGING MATERIALS",
        "subcategory": "General",
        "description": "",
        "image": "/products/Packaging materials/brown-packaging-tape-500x500-1.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PACKAGING_MATERIALS_General_Cyklop_PET",
        "name": "Cyklop_PET",
        "category": "PACKAGING MATERIALS",
        "subcategory": "General",
        "description": "Strength: 55 – 400kg",
        "image": "/products/Packaging materials/Cyklop_PET.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PACKAGING_MATERIALS_General_Polycord_1",
        "name": "polycord",
        "category": "PACKAGING MATERIALS",
        "subcategory": "General",
        "description": "Width: 13mm-32mm\nLoad: 270-2600kg\n\nLength: 230-1100m\n\nRolls: 2Ctn | 90Plt",
        "image": "/products/Packaging materials/Polycord-1.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PACKAGING_MATERIALS_General_polylash",
        "name": "polylash",
        "category": "PACKAGING MATERIALS",
        "subcategory": "General",
        "description": "Width: 32-50mm\n\nTensile Strength: 2000-7500Kg",
        "image": "/products/Packaging materials/polylash.jpeg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PACKAGING_MATERIALS_General_POLYTEX2",
        "name": "POLYTEX2",
        "category": "PACKAGING MATERIALS",
        "subcategory": "General",
        "description": "Width: 13-25mm\n\nTensile Strength: 380-1100kg",
        "image": "/products/Packaging materials/POLYTEX2.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PACKAGING_TOOLS_Strapping_tools_20210929173700_40350",
        "name": "Pneumatic Strapping Tool",
        "category": "PACKAGING TOOLS",
        "subcategory": "Strapping tools",
        "description": "",
        "image": "/products/Packaging tools/Strapping tools/20210929173700_40350.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PACKAGING_TOOLS_Strapping_tools_20211009113522_56377_1536x1536",
        "name": "Polyester Strapping Tensioner",
        "category": "PACKAGING TOOLS",
        "subcategory": "Strapping tools",
        "description": "",
        "image": "/products/Packaging tools/Strapping tools/20211009113522_56377-1536x1536.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PACKAGING_TOOLS_Strapping_tools_20211011144058_21896",
        "name": "Cord Strapping Tensioner",
        "category": "PACKAGING TOOLS",
        "subcategory": "Strapping tools",
        "description": "",
        "image": "/products/Packaging tools/Strapping tools/20211011144058_21896.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PACKAGING_TOOLS_Strapping_tools_20211011180630_31788",
        "name": "Premium Strapping Tensioner",
        "category": "PACKAGING TOOLS",
        "subcategory": "Strapping tools",
        "description": "",
        "image": "/products/Packaging tools/Strapping tools/20211011180630_31788.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PACKAGING_TOOLS_Strapping_tools_20211012170012_97381",
        "name": "Heavy Duty Cord Strapping Tensioner",
        "category": "PACKAGING TOOLS",
        "subcategory": "Strapping tools",
        "description": "",
        "image": "/products/Packaging tools/Strapping tools/20211012170012_97381.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PACKAGING_TOOLS_Strapping_tools_20211013103553_33407",
        "name": "Heavy Duty Poly Strap Tensioner",
        "category": "PACKAGING TOOLS",
        "subcategory": "Strapping tools",
        "description": "",
        "image": "/products/Packaging tools/Strapping tools/20211013103553_33407.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PACKAGING_TOOLS_Strapping_tools_20211013114914_56279",
        "name": "Premium Cord Strapping Tensioner",
        "category": "PACKAGING TOOLS",
        "subcategory": "Strapping tools",
        "description": "",
        "image": "/products/Packaging tools/Strapping tools/20211013114914_56279.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PACKAGING_TOOLS_Strapping_tools_20211013120007_89741",
        "name": "Heavy Duty Cord Strapping Tensioner",
        "category": "PACKAGING TOOLS",
        "subcategory": "Strapping tools",
        "description": "",
        "image": "/products/Packaging tools/Strapping tools/20211013120007_89741.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PACKAGING_TOOLS_Strapping_tools_20211013143615_73711",
        "name": "Pneumatic Cord Strapping Tensioner",
        "category": "PACKAGING TOOLS",
        "subcategory": "Strapping tools",
        "description": "",
        "image": "/products/Packaging tools/Strapping tools/20211013143615_73711.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PACKAGING_TOOLS_Strapping_tools_20211014113343_78491",
        "name": "Strapping Sealer",
        "category": "PACKAGING TOOLS",
        "subcategory": "Strapping tools",
        "description": "",
        "image": "/products/Packaging tools/Strapping tools/20211014113343_78491.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PACKAGING_TOOLS_Strapping_tools_20211014160509_88035_2",
        "name": "JWC Poly Strapping Sealer",
        "category": "PACKAGING TOOLS",
        "subcategory": "Strapping tools",
        "description": "",
        "image": "/products/Packaging tools/Strapping tools/20211014160509_88035-2.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PACKAGING_TOOLS_Strapping_tools_20240416100026_41086",
        "name": "One Button Operated Battery Strapping Tool",
        "category": "PACKAGING TOOLS",
        "subcategory": "Strapping tools",
        "description": "",
        "image": "/products/Packaging tools/Strapping tools/20240416100026_41086.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Battery_operated_single_needle_single_thread_chain_stitch_machines_KP_2701B",
        "name": "KP-2701B",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Battery operated single needle single thread chain stitch machines",
        "description": "Portable Bag Closer,",
        "image": "/products/Portable bag closers/Battery Operated Single Needle Single Thread Chain Stitch Machines/KP-2701B.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Battery_operated_single_needle_single_thread_chain_stitch_machines_N600A_12V_BTN",
        "name": "N600A-12V-BTN",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Battery operated single needle single thread chain stitch machines",
        "description": "KP-2710B\nSemi-Automatic Machine with Battery\nSingle Needle Sing Thread Machine\nSpeed : 1800 rpm",
        "image": "/products/Portable bag closers/Battery Operated Single Needle Single Thread Chain Stitch Machines/N600A-12V-BTN.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Battery_operated_single_needle_single_thread_chain_stitch_machines_PBC_KP_3000B",
        "name": "KP- 3000B",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Battery operated single needle single thread chain stitch machines",
        "description": "Semi-Automatic Machine with Battery\nSingle Needle Sing Thread Machine\nSpeed : 1800 rpm\n\nBelow are Double Thread Single Needle Chain Stitch Machines",
        "image": "/products/Portable bag closers/Battery Operated Single Needle Single Thread Chain Stitch Machines/PBC_KP-3000B.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Double_thread_double_needle_chain_stitch_machines_DE_DA6",
        "name": "DE-DA6",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Double thread double needle chain stitch machines",
        "description": "**Power Requirement:-** Ac/Dc\n\n**Motor**: 1/10 Hp 8000 Rpm 220v , 1.5 Amps\n\n**Sewing Speed** : 1600 \\-1800 stitches per minute 5 to 8 Bags per minute\n\n**Needle** : DBx1 200/25 (Groz Backert, Germany).",
        "image": "/products/Portable bag closers/Double Thread Double Needle Chain Stitch Machines/DE-DA6.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Double_thread_double_needle_chain_stitch_machines_PBC_LPI_DE_DA",
        "name": "DE-DA",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Double thread double needle chain stitch machines",
        "description": "",
        "image": "/products/Portable bag closers/Double Thread Double Needle Chain Stitch Machines/PBC_LPI_DE-DA.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Double_thread_double_needle_chain_stitch_machines_PBC_N620A",
        "name": "N620A",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Double thread double needle chain stitch machines",
        "description": "",
        "image": "/products/Portable bag closers/Double Thread Double Needle Chain Stitch Machines/PBC_N620A.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Double_thread_single_needle_chain_stitch_machines_D_2",
        "name": "D-2",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Double thread single needle chain stitch machines",
        "description": "",
        "image": "/products/Portable bag closers/Double Thread Single Needle Chain Stitch Machines/D-2.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Double_thread_single_needle_chain_stitch_machines_DAD_R",
        "name": "DAD-R",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Double thread single needle chain stitch machines",
        "description": "Twin Needle, Two Thread, Portable Bag Closer Sewing Machine for bag closing mouth of filled jute or woven PP sacks. Two parallel seams ideal where extra secure bag closing is required.\n\n\n\n**Power** : 220V, 1.3 amps, 8000 rpm AC Motor, also available with 110V AC Motor\n\n**Bag Closing Speed** : 1800 stitch per minute\n\n**Type of Stitch** : Federal stitch type 101 parallel chain-stitch\n\n**Stitch Length** : 3.5 stitches/ inch (25.4 mm) Fixed",
        "image": "/products/Portable bag closers/Double Thread Single Needle Chain Stitch Machines/DAD-R.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Double_thread_single_needle_chain_stitch_machines_PBC_2200A",
        "name": "2200A",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Double thread single needle chain stitch machines",
        "description": "Combined upper and lower feed grips both sides of material\n\nBuilt in thread chain cutter\n\nAdjustable stitch length\n\nBelow are",
        "image": "/products/Portable bag closers/Double Thread Single Needle Chain Stitch Machines/PBC_2200A.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Double_thread_single_needle_chain_stitch_machines_PBC_NP_311",
        "name": "NP-311",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Double thread single needle chain stitch machines",
        "description": "The Newlong NP-311 portable bag closer is a durable and reliable solution, tailored for use with GeoTextile fabrics. Its robust construction can withstand the demands of industrial settings. The double thread chain stitch, utilizing one needle and a looper, is designed to provide a strong and tightly sealed closure, ensuring the contents of filled bags are securely contained.\nThe inclusion of automatic thread cutting enhances efficiency, reducing the need for manual intervention during the closing process. The shoulder belt spring balancer with a hanger likely adds to the convenience and ease of use, allowing operators to work comfortably for extended periods without strain.\nAdditionally, the optional thread cone cover could be beneficial for protecting the thread from dust and debris, potentially extending the lifespan of the machine and ensuring consistent performance over time. Overall, the NP-311 seems like a well-equipped and versatile bag closer suitable for various applications involving GeoTextile fabrics.\nNP-311 is a Double Thread Chain Stitch Machine\nMax Speed : 1550 rpm\nCutter : Half Automatic Thread Cutter\nBrand : Newlong Industrial\nMade in Japan\n\nHeavy Duty 2 Thread Machine",
        "image": "/products/Portable bag closers/Double Thread Single Needle Chain Stitch Machines/PBC_NP-311.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Single_needle_single_thread_chain_stitch_machines_Crepe_tape_attachment_NP_7A",
        "name": "NP-7A",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Single needle single thread chain stitch machines",
        "description": "Brand : Newlong Industrial\n\nMaximum Speed : 1700-1900 rpm\n\nType of stitch : Single Needle Chain Stitch\n\nMade in Japan",
        "image": "/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/Crepe-tape-attachment-NP-7A.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Single_needle_single_thread_chain_stitch_machines_DA_6",
        "name": "DA-6",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Single needle single thread chain stitch machines",
        "description": "",
        "image": "/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/DA-6.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Single_needle_single_thread_chain_stitch_machines_GNP_7A",
        "name": "NP-7A",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Single needle single thread chain stitch machines",
        "description": "Brand : Newlong Industrial\n\nMaximum Speed : 1700-1900 rpm\n\nType of stitch : Single Needle Chain Stitch\n\nMade in Japan",
        "image": "/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/GNP-7A.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Single_needle_single_thread_chain_stitch_machines_HBC_DA_TEX",
        "name": "DA-TEX",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Single needle single thread chain stitch machines",
        "description": "Maximum Speed : 1600 – 1800 stitches/ minute\nType of stitch : Single Thread Chain Stitch\nDimension : 44cm × 29cm × 36cm\nBrand : LPI, Made in India",
        "image": "/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/HBC_DA_TEX.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Single_needle_single_thread_chain_stitch_machines_L_1",
        "name": "L-1",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Single needle single thread chain stitch machines",
        "description": "",
        "image": "/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/L-1.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Single_needle_single_thread_chain_stitch_machines_NP_7A",
        "name": "NP-7A",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Single needle single thread chain stitch machines",
        "description": "Brand : Newlong Industrial\n\nMaximum Speed : 1700-1900 rpm\n\nType of stitch : Single Needle Chain Stitch\n\nMade in Japan",
        "image": "/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/NP-7A.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Single_needle_single_thread_chain_stitch_machines_NP_7H",
        "name": "PBC\\_GK-9-2",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Single needle single thread chain stitch machines",
        "description": "",
        "image": "/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/NP-7H.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Single_needle_single_thread_chain_stitch_machines_PBC_Fischbein_Model",
        "name": "PBC_Fischbein_Model",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Single needle single thread chain stitch machines",
        "description": "LPI L-1\nSewing Speed : 1700-1900 RPM , 6-9 bags per minute\nStitch Length : 3.5 stitches per inch (25.4MM), also available in 3 stitches per inch (25.4MM)\nNeedle : DBXI 200/25 (GROZ  BECKERT, GERMANY)\nLubricant : 2T Oil, 20W40 Engine Oil",
        "image": "/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/PBC_Fischbein_Model.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Single_needle_single_thread_chain_stitch_machines_PBC_GK_9_2",
        "name": "GK 9-2",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Single needle single thread chain stitch machines",
        "description": "Light weight & Economic",
        "image": "/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/PBC_GK-9-2.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Single_needle_single_thread_chain_stitch_machines_PBC_GK_26_1A",
        "name": "GK 26-1A",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Single needle single thread chain stitch machines",
        "description": "Single Needle Chain Stitch Machine\nSpeed : 1500 – 1800 rpm\n\n\nPortable Bag Closing Machine, GNP-7A\nSingle Needle Chain Stitch Machine\nMaximum Speed : 1900 rpm\nAutomatic Lubrication to reduce wear & tear\nHigh speed motor with semiautomatic thread cutter",
        "image": "/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/PBC_GK_26_1A.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Single_needle_single_thread_chain_stitch_machines_PBC_KP2701",
        "name": "KP2701",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Single needle single thread chain stitch machines",
        "description": "Light Weight Sewing Machine\nSpeed : 1500 – 1700 rpm",
        "image": "/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/PBC_KP2701.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Single_needle_single_thread_chain_stitch_machines_PBC_LPI_DA_C",
        "name": "DA-C",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Single needle single thread chain stitch machines",
        "description": "With Mechanical Cutter outside\nMaximum Speed : 1700 – 1900 rpm\nType of Stitch : Single Thread Chain Stitch\nBrand : LPI, Made in India\nPortable Bag Closing Machine\nSewing Speed : 1600 – 1800 stitches per minute\nType of stitch : Single Thread Chain Stitch\nDimension : 44cm × 29cm × 36cm",
        "image": "/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/PBC_LPI_DA-C.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "PORTABLE_BAG_CLOSERS_Single_needle_single_thread_chain_stitch_machines_PBC_LPI_DA",
        "name": "LPI, Made in India",
        "category": "PORTABLE BAG CLOSERS",
        "subcategory": "Single needle single thread chain stitch machines",
        "description": "Portable Bag Closing Machine, Model F\nSingle Needle Chain Stitch Machine\nSemi Automatic Lubrication\nWith Double Insulated Motor\nPresser Foot Lifter Mechanism\nBrand : Fischbein, Made in USA",
        "image": "/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/PBC_LPI_DA.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Band_sealers_Continuous_band_sealer_FRB_770I",
        "name": "Continuous-band-sealer-FRB-770I",
        "category": "SEALING MACHINES",
        "subcategory": "Band sealers",
        "description": "",
        "image": "/products/Sealing Machines/Band Sealers/Continuous-band-sealer-FRB-770I.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Band_sealers_FR_1370LD",
        "name": "FR-1370LD",
        "category": "SEALING MACHINES",
        "subcategory": "Band sealers",
        "description": "Below are Pneumatic Heavy Bag Sealer",
        "image": "/products/Sealing Machines/Band Sealers/FR-1370LD.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Band_sealers_FR_1370LT",
        "name": "FR-1370LT",
        "category": "SEALING MACHINES",
        "subcategory": "Band sealers",
        "description": "",
        "image": "/products/Sealing Machines/Band Sealers/FR-1370LT.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Band_sealers_FRM_1120LD",
        "name": "FRM-1120LD",
        "category": "SEALING MACHINES",
        "subcategory": "Band sealers",
        "description": "",
        "image": "/products/Sealing Machines/Band Sealers/FRM-1120LD.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Band_sealers_FRM_1120W",
        "name": "FRM-1120W",
        "category": "SEALING MACHINES",
        "subcategory": "Band sealers",
        "description": "",
        "image": "/products/Sealing Machines/Band Sealers/FRM-1120W.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Band_sealers_High_Speed_Band_sealer_FRB_770I",
        "name": "High-Speed-Band-sealer-FRB-770I",
        "category": "SEALING MACHINES",
        "subcategory": "Band sealers",
        "description": "",
        "image": "/products/Sealing Machines/Band Sealers/High-Speed-Band-sealer-FRB-770I.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Blister_sealing_machine_SM_5",
        "name": "SM-5",
        "category": "SEALING MACHINES",
        "subcategory": "Blister sealing machine",
        "description": "The name is given in website as [Blister Pack Heat Sealer XBF-750](https://junko-fze.com/product/blister-pack-heat-sealer-xbf-750/)\n\nBelow are Carton Sealer",
        "image": "/products/Sealing Machines/Blister Sealing Machine/SM-5.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Carton_sealer_SM_7",
        "name": "SM-7",
        "category": "SEALING MACHINES",
        "subcategory": "Carton sealer",
        "description": "",
        "image": "/products/Sealing Machines/Carton Sealer/SM-7.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Heavy_duty_bag_sealing_machine_FBH_32",
        "name": "FBH-32",
        "category": "SEALING MACHINES",
        "subcategory": "Heavy duty bag sealing machine",
        "description": "Below are Sealing and Stitching Packaging Machine",
        "image": "/products/Sealing Machines/Heavy Duty Bag Sealing Machine/FBH-32.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Impulse_sealers_Hand_Impulse_Sealer_600_800_1000_mm",
        "name": "Hand-Impulse-Sealer-600-800-1000-mm",
        "category": "SEALING MACHINES",
        "subcategory": "Impulse sealers",
        "description": "",
        "image": "/products/Sealing Machines/Impulse Sealers/Hand-Impulse-Sealer-600-800-1000-mm.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Impulse_sealers_hand_impulse_sealer_cutter",
        "name": "hand-impulse-sealer-cutter",
        "category": "SEALING MACHINES",
        "subcategory": "Impulse sealers",
        "description": "",
        "image": "/products/Sealing Machines/Impulse Sealers/hand-impulse-sealer-cutter.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Impulse_sealers_hand_impulse_sealer_e1709270523894",
        "name": "hand-impulse-sealer-e1709270523894",
        "category": "SEALING MACHINES",
        "subcategory": "Impulse sealers",
        "description": "",
        "image": "/products/Sealing Machines/Impulse Sealers/hand-impulse-sealer-e1709270523894.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Impulse_sealers_pedal_impulse_sealer",
        "name": "pedal-impulse-sealer",
        "category": "SEALING MACHINES",
        "subcategory": "Impulse sealers",
        "description": "",
        "image": "/products/Sealing Machines/Impulse Sealers/pedal-impulse-sealer.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Impulse_sealers_table_style_pedal_impulse_sealer",
        "name": "pedal-impulse-sealer",
        "category": "SEALING MACHINES",
        "subcategory": "Impulse sealers",
        "description": "",
        "image": "/products/Sealing Machines/Impulse Sealers/table-style-pedal-impulse-sealer.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Pneumatic_heavy_bag_sealer_QF_600LS",
        "name": "QF-600LS",
        "category": "SEALING MACHINES",
        "subcategory": "Pneumatic heavy bag sealer",
        "description": "Below are Heavy Duty Bag Sealing Machine",
        "image": "/products/Sealing Machines/Pneumatic heavy bag sealer/QF-600LS.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Sealing_and_stitching_packaging_machine_FBK_24D",
        "name": "FBK-24D",
        "category": "SEALING MACHINES",
        "subcategory": "Sealing and stitching packaging machine",
        "description": "Next",
        "image": "/products/Sealing Machines/Sealing and Stitching Packaging Machine/FBK-24D.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Sealing_and_stitching_packaging_machine_FBK_332C",
        "name": "FBK-332C",
        "category": "SEALING MACHINES",
        "subcategory": "Sealing and stitching packaging machine",
        "description": "FBK series one-lined sealing and stitching automatic packaging machine, fit for packing single layer Kraft paper, multi-layer Kraft paper, paper/plastic laminated bag\n\nSealing and Stitching Automatic Packaging Machine",
        "image": "/products/Sealing Machines/Sealing and Stitching Packaging Machine/FBK-332C.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Sealing_and_stitching_packaging_machine_SM_1",
        "name": "SM-1",
        "category": "SEALING MACHINES",
        "subcategory": "Sealing and stitching packaging machine",
        "description": "Voltage(V/Hz) : AC 380/50\n\nGross Power(KW : 5\n\nTransmission Power(KW) : 0.75\n\nMotor Power of Sewing Machine(KW) : 0.37\n\nHeating Power(KW) : 0.5×6\n\nDeduster Power(KW) : 0.75\n\nSealing Speed(m/min) : 8\\. 5(limit 11\\)\n\nTemperature Range(℃) : 0-400\n\nNet Weight(kg) : 500\n\nBelow are the Machine Heads",
        "image": "/products/Sealing Machines/Sealing and Stitching Packaging Machine/SM-1.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Solid_ink_coding_band_sealer_SM_3",
        "name": "SM-3",
        "category": "SEALING MACHINES",
        "subcategory": "Solid ink coding band sealer",
        "description": "Next\n**Voltage (V/Hz) :** AC 220/50 110/60\n\n**Motor Power (W) :** 100\n\n**Sealing Power (W) :** 400×2\n\n**Printing Heating Power (W)** : 40×2\n\n**Speed (m/min) :** 0-12 (0-16)\n\n**Sealing Width (mm) :** 10\n\n**Temperature Range (℃) :** 0-300\n\n**Printing Type :** Solid-Ink Roller\n\n**Conveyor Table Size (L × W) :** 1065×205\n\n**Net Weight (kg)** : 55\n\n**Overall Conveyor Loading (kg)** : ≤10",
        "image": "/products/Sealing Machines/Solid Ink Coding Band Sealer/SM-3.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Solid_ink_coding_band_sealer_SM_6",
        "name": "SM-6",
        "category": "SEALING MACHINES",
        "subcategory": "Solid ink coding band sealer",
        "description": "Below are Strapping Machine",
        "image": "/products/Sealing Machines/Solid Ink Coding Band Sealer/SM-6.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Strapping_machine_SM_9",
        "name": "SM-6",
        "category": "SEALING MACHINES",
        "subcategory": "Strapping machine",
        "description": "Below are Strapping Machine",
        "image": "/products/Sealing Machines/Strapping Machine/SM-9.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "SEALING_MACHINES_Vaccum_packaging_machine_SM_8",
        "name": "SM-6",
        "category": "SEALING MACHINES",
        "subcategory": "Vaccum packaging machine",
        "description": "Below are Strapping Machine",
        "image": "/products/Sealing Machines/Vaccum Packaging Machine/SM-8.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "WEIGHING_SCALES_Electronic_weighing_scales_asss_jpg",
        "name": "#### [**Animal Scale**](https://junko-fze.com/product/animal-scale/)**",
        "category": "WEIGHING SCALES",
        "subcategory": "Electronic weighing scales",
        "description": "",
        "image": "/products/weighing scales/Electronic Weighing Scales/asss.jpg.webp",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "WEIGHING_SCALES_Electronic_weighing_scales_Bench_Model",
        "name": "Bench Platform Weighing Scale",
        "category": "WEIGHING SCALES",
        "subcategory": "Electronic weighing scales",
        "description": "Bench Platform Weighing Scale\nA bench platform weighing scale is used for error-free operation. The bench platform weighing scales enable high throughput for weighing, measuring, formulation, etc. Bigger size bench platform weighing scale with pole display and fabricated grill is used for convenient weighing. It also has a stable weight reading for quick notification.\nThe bench platform weighing scale is used for various applications like logistics, industrial, commercial, market yards etc.\nCapacity : 50 kg – 100 kg",
        "image": "/products/weighing scales/Electronic Weighing Scales/Bench_Model.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "WEIGHING_SCALES_Electronic_weighing_scales_Bench_Model_Mini",
        "name": "Mini Bench Model",
        "category": "WEIGHING SCALES",
        "subcategory": "Electronic weighing scales",
        "description": "Mini Bench Model\nThe mini bench model weighing scale is on a wide demand in the market for sturdy construction, quick installation, low maintenance etc. The mini bench model has a customized size platform with pole double display (front and back in pole). It has a stable weight reading for speed weighing.\nCustomized size platform with pole double display (front and back in pole). Easy to use tare option of the mini bench model makes it possible to get an accurate reading when extra container placed on the scale.\nCapacity : 50 kg",
        "image": "/products/weighing scales/Electronic Weighing Scales/Bench_Model_Mini.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "WEIGHING_SCALES_Electronic_weighing_scales_Field_Scale",
        "name": "Field Scale",
        "category": "WEIGHING SCALES",
        "subcategory": "Electronic weighing scales",
        "description": "Field Scale\nThe field scale is a slim, compact and easy to carry weighing scale that you can carry wherever you go. The high quality of field weighing scale enables for rough handling. The field scale has a customized size platform with optional double display used for multiple applications.\nThe field scale has an easy to use tare option that makes it possible to get an accurate reading when the extra container placed on the scale. The field scale has a detachable power chord for charging and easy handling.\nCapacity : 50 kg – 100 kg",
        "image": "/products/weighing scales/Electronic Weighing Scales/Field_Scale.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "WEIGHING_SCALES_Electronic_weighing_scales_heavy_platform",
        "name": "Heavy Platform",
        "category": "WEIGHING SCALES",
        "subcategory": "Electronic weighing scales",
        "description": "Heavy Platform\nThe heavy platform Scale was designed to measure various object weights. This weighing scale is famed for its reliability, strength, safety and accuracy.\nThere are various applications that use the heavy platform weighing scale. The heavy platform scale is used for industrial, commercial, market yards, warehouses, logistics etc.\nThe heavy platform scale has various features like heavy structure by in house fabrication, advanced micro controller based design, easy to read six digit bright LED display, very low power consumption, power saver mode, over load indication etc.\nCapacity: 300 kg – 500 kg",
        "image": "/products/weighing scales/Electronic Weighing Scales/heavy_platform.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "WEIGHING_SCALES_Electronic_weighing_scales_Jewelley_Scale",
        "name": "Jewellery Scale",
        "category": "WEIGHING SCALES",
        "subcategory": "Electronic weighing scales",
        "description": "Jewellery Scale\nThe high quality jewellery scale has a user friendly display. They are highly efficient and provide precise results. It is a very high precision load cell based jewellery weighing scale. The advanced micro-controller circuit of the jewelley scale provides stable and accurate weighing. It has an inbuilt counting and battery backup facility.\nThe jewellery weighing scale comes with a windshield for accurate weighing and also an extra display for customers.\nCapacity : 300 gm – 1 kg\n\nBelow are Mechanical Weighing Scales",
        "image": "/products/weighing scales/Electronic Weighing Scales/Jewelley_Scale.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "WEIGHING_SCALES_Electronic_weighing_scales_pallet_scale_1734x2048",
        "name": "#### [**Pallet Scale**](https://junko-fze.com/product/pallet-scale/)**",
        "category": "WEIGHING SCALES",
        "subcategory": "Electronic weighing scales",
        "description": "",
        "image": "/products/weighing scales/Electronic Weighing Scales/pallet-scale-1734x2048.jpg",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "WEIGHING_SCALES_Electronic_weighing_scales_Platform_Type",
        "name": "Platform Type Weighing Scale",
        "category": "WEIGHING SCALES",
        "subcategory": "Electronic weighing scales",
        "description": "",
        "image": "/products/weighing scales/Electronic Weighing Scales/Platform_Type.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "WEIGHING_SCALES_Electronic_weighing_scales_Price_Computing",
        "name": "Price Computing",
        "category": "WEIGHING SCALES",
        "subcategory": "Electronic weighing scales",
        "description": "Price Computing\nA price computing weighing scale comes very useful in a retail shop or a grocery shop. The price computing weighing scale comes with a price computing option to calculate the weight and price at the same time and display it.\nSome of the features of the price computing weighing scale are price computing/ piece computing scale, single key press price feeding, RED/ GREEN 7 segment LED display, thermocol packing with color box and many more.\nCapacity : 10 kg – 30 kg",
        "image": "/products/weighing scales/Electronic Weighing Scales/Price_Computing.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "WEIGHING_SCALES_Electronic_weighing_scales_Table_Top",
        "name": "Table Top Weighing Scale",
        "category": "WEIGHING SCALES",
        "subcategory": "Electronic weighing scales",
        "description": "Table Top Weighing Scale\nDigital Table Top weighing scales are used to measure and weigh things on a day-day basis. Digital Table Top weighing scales have become the smartest way to weigh things in this digital era. The digital weighing scales are available at different sizes and with various functions for different uses.\nThe digital table top weighing scale is used in different applications like grocery store, vegetables and fruit shops, fish and meat shops, departmental stores. The table top weighing scale is a simple weighing scale with dual display. Some of it’s features include 8 hour battery backup, power saver mode, over load indication etc.\nCapacity : 10 kg – 30 kg",
        "image": "/products/weighing scales/Electronic Weighing Scales/Table_Top.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "WEIGHING_SCALES_Electronic_weighing_scales_table_top_front_back_display",
        "name": "Table Top Weighing Scale",
        "category": "WEIGHING SCALES",
        "subcategory": "Electronic weighing scales",
        "description": "Table Top Weighing Scale\nDigital Table Top weighing scales are used to measure and weigh things on a day-day basis. Digital Table Top weighing scales have become the smartest way to weigh things in this digital era. The digital weighing scales are available at different sizes and with various functions for different uses.\nThe digital table top weighing scale is used in different applications like grocery store, vegetables and fruit shops, fish and meat shops, departmental stores. The table top weighing scale is a simple weighing scale with dual display. Some of it’s features include 8 hour battery backup, power saver mode, over load indication etc.\nCapacity : 10 kg – 30 kg",
        "image": "/products/weighing scales/Electronic Weighing Scales/table_top_front_back_display.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "WEIGHING_SCALES_Electronic_weighing_scales_table_top_water_proof",
        "name": "Table Top Weighing Scale",
        "category": "WEIGHING SCALES",
        "subcategory": "Electronic weighing scales",
        "description": "Table Top Weighing Scale\nDigital Table Top weighing scales are used to measure and weigh things on a day-day basis. Digital Table Top weighing scales have become the smartest way to weigh things in this digital era. The digital weighing scales are available at different sizes and with various functions for different uses.\nThe digital table top weighing scale is used in different applications like grocery store, vegetables and fruit shops, fish and meat shops, departmental stores. The table top weighing scale is a simple weighing scale with dual display. Some of it’s features include 8 hour battery backup, power saver mode, over load indication etc.\nCapacity : 10 kg – 30 kg",
        "image": "/products/weighing scales/Electronic Weighing Scales/table_top_water_proof.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "WEIGHING_SCALES_Mechanical_weighing_scales_1220_Long__Hand__Pallet_Truck_png",
        "name": "1220_Long-_Hand-_Pallet_Truck.png",
        "category": "WEIGHING SCALES",
        "subcategory": "Mechanical weighing scales",
        "description": "",
        "image": "/products/weighing scales/Mechanical Weighing Scales/1220_Long-_Hand-_Pallet_Truck.png.webp",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "WEIGHING_SCALES_Mechanical_weighing_scales_counter_scale",
        "name": "counter_scale",
        "category": "WEIGHING SCALES",
        "subcategory": "Mechanical weighing scales",
        "description": "Manual Counter Weighing Scale\nThe highly impressive manual counter weighing scale is unique for small and accurate weighing. This manual counter weighing scale has rigid cast-iron body base and heavy beam. This scale is ideal for general purpose use in grocery stores, fruit and vegetable shops and can be used where electricity is not available.\nCapacity : 10 kg",
        "image": "/products/weighing scales/Mechanical Weighing Scales/counter_scale.png",
        "specs": {},
        "features": [],
        "featured": false
    },
    {
        "id": "WEIGHING_SCALES_Mechanical_weighing_scales_manual_platform",
        "name": "manual_platform",
        "category": "WEIGHING SCALES",
        "subcategory": "Mechanical weighing scales",
        "description": "Manual Platform Weighing Scale\nA range of manual platform weighing scale is made up of high quality casting. The manual platform weighing scale is durable to work under harsh environments.\nThis scale is also ideal for general purpose use in factories, stores railways, dock, and harbor warehouses etc., or wherever a low priced, compact scale of small dimension is required for weighing.\nCapacity : 100 gm, 300 kg, 500 kg",
        "image": "/products/weighing scales/Mechanical Weighing Scales/manual_platform.png",
        "specs": {},
        "features": [],
        "featured": false
    }
];
