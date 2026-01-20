export interface Product {
    id: string;
    name: string;
    category: string;
    subcategory?: string;
    description?: string;
    image: string; // Now required
    specs?: Record<string, string>;
    features?: string[];
    featured?: boolean;
}

export interface Category {
    name: string;
    subcategories: string[];
}

export const allProducts: Product[] = [
    // --- BAG CLOSING MACHINES ---
    // Machine Heads & Systems
    {
        id: '80800rl',
        name: 'Union Special 80800RL',
        category: 'SEWING MACHINE',
        subcategory: 'SEWING MACHINE',
        description: 'Automatic 2-thread double-locked stitch bag closing machine. Built for superior performance in automated lines with a start-stop foot switch operation.',
        image: '/products/Bag Closing Machines/Machine_heads/80800RL.jpg',
        featured: true
    },
    {
        id: 'bcm-1',
        name: 'Semi-Automatic Bag Closer 80800 C',
        category: 'BAG CLOSING MACHINES',
        subcategory: 'BAG CLOSING MACHINES',
        description: 'Robust semi-automatic machine engineered for durability. Features a long curved stitch plate for smooth feeding and a continuously driven nibbler knife.',
        image: '/products/Bag Closing Machines/Machine_heads/BCM_1.png'
    },
    {
        id: 'bcm-2',
        name: 'High Speed Bag Closer (GK-35 2C)',
        category: 'BAG CLOSING MACHINES',
        subcategory: 'BAG CLOSING MACHINES',
        description: 'High-speed single needle bag closer operating at 1900 RPM. Features an adjustable stitch range of 6.5-11mm and manual nibbler knife system.',
        image: '/products/Bag Closing Machines/Machine_heads/BCM_2.png'
    },
    {
        id: 'bcm-3',
        name: 'High Speed Chain Stitcher',
        category: 'BAG CLOSING MACHINES',
        subcategory: 'Machine Heads & Systems',
        description: 'Reliable double thread chain stitch machine with 1600 RPM max speed. Optimized for paper and PP bags with automatic crepe tape cutting.',
        image: '/products/Bag Closing Machines/Machine_heads/BCM_3.png'
    },
    {
        id: 'bcm-4',
        name: 'Automatic Crepe Tape Cutter Head',
        category: 'BAG CLOSING MACHINES',
        subcategory: 'Machine Heads & Systems',
        description: 'High-performance head (2700 RPM) with built-in automatic crepe tape cutter. Ideal for bag making lines requiring precise 4P paper bag closing.',
        image: '/products/Bag Closing Machines/Machine_heads/BCM_4.png'
    },
    {
        id: 'bcm-7',
        name: 'Heavy Duty Bag Closer (Fischbein Model 100)',
        category: 'BAG CLOSING MACHINES',
        subcategory: 'BAG CLOSING MACHINES',
        description: 'Heavy-duty industrial head. Features a pressurized self-lubricating system and variable stitch width (2-4 SPI). Perfect for demanding environments.',
        image: '/products/Bag Closing Machines/Machine_heads/BCM_7.png',
        featured: true
    },
    {
        id: 'ds-9a',
        name: 'DS-9A High Speed Head',
        category: 'BAG CLOSING MACHINES',
        subcategory: 'Machine Heads',
        description: 'Fastest in class (2700 RPM) single needle double thread machine with mechanically operated cutter and oil bath lubrication.',
        image: '/products/Bag Closing Machines/Machine_heads/DS-9A.png',
        specs: {
            'Max Speed': '2,700 rpm',
            'Seam': 'Double Thread Chain Stitch',
            'Stitch width': '7-11.5mm',
            'Bag Material': 'Paper. PP',
            'Thickness': 'Paper bag 4P with a Tuck',
            'Needle': 'DR-H30 \#26',
        },
    },
    {
        id: 'gk35-6c',
        name: 'Double Needle Bag Closer',
        category: 'BAG CLOSING MACHINES',
        subcategory: 'Machine Heads',
        description: 'Double-needle, four-thread machine for leak-proof sealing. Sews two parallel stitch lines simultaneously for maximum security.',
        image: '/products/Bag Closing Machines/Machine_heads/GK35-6C.png'
    },
    {
        id: 'a1-p-ds-2ii',
        name: 'Automatic Pedestal System A1-P',
        category: 'BAG CLOSING MACHINES',
        subcategory: 'Bag Closing Machine Systems',
        description: 'Complete semi-automatic pedestal system with DS-2II head and foot switch. Adjustable height for versatile production lines.',
        image: '/products/Bag Closing Machines/bag_closing_machine_systems/A1-P-DS-2II.png'
    },
    {
        id: 'bcm-6',
        name: 'Automatic Bag Closing System',
        category: 'BAG CLOSING MACHINES',
        subcategory: 'Machine Heads & Systems',
        description: 'Fully automatic height-adjustable bag closing system (A1 PB – DS 9C). Vector drive technology for seamless conveyor integration.',
        image: '/products/Bag Closing Machines/bag_closing_machine_systems/BCM_6.png'
    },
    {
        id: 'fbk-24d',
        name: 'FBK Automatic Packaging System',
        category: 'SEALING MACHINES',
        subcategory: 'Heavy Duty & Specialty',
        description: 'Integrated one-line sealing and stitching system. Automatically trims, stitches, and seals kraft or laminated bags for a premium finish.',
        image: '/products/Sealing Machines/Sealing and Stitching Packaging Machine/FBK-24D.png',
        featured: true
    },
    {
        id: 'fbk-332c',
        name: 'Heavy Duty Sealing System',
        category: 'SEALING MACHINES',
        subcategory: 'Heavy Duty & Specialty',
        description: 'Advanced automatic packaging machine for single or multi-layer kraft paper bags. Ensuring dust-proof and sift-proof closures.',
        image: '/products/Sealing Machines/Sealing and Stitching Packaging Machine/FBK-332C.png',
        features: [
            'Sealing and Stitching Automatic Packaging Machine',
        ],
    },
    {
        id: 'fn600a',
        name: 'Pedestal for Portable Closer',
        category: 'BAG CLOSING MACHINES',
        subcategory: 'Bag Closing Machine Systems',
        description: 'Adjustable pedestal mount for NP-7A portable closers. Features track wheels and foot switch for hands-free factory operation.',
        image: '/products/Bag Closing Machines/bag_closing_machine_systems/FN600A.png',
        specs: {
            'Sewing Speed': '0-1900 rpm',
            'Working Speed': '0-1700 rpm',
            'Sewing Thickness': '0-8mm',
            'Stitch Adjustment Range': '6.5-11mm',
            'Sewing Stitch Type': 'double chain type (401)',
            'Needle Model': '80800 (200-250\#)',
            'MTHREADS': '2 Thread',
            'START/STOP': 'Foot Switch',
            'WEIGHT': '29kg',
            'MATERIALS': 'Burlap Bag, Jute, Paper, PE-Material, PP Laminated Woven Fabric, PP Woven Fabric',
            'CLOSURE TYPE': 'Closure with Filler-Cord, Fold Over Closure, Plain Closure',
            'BAGS PER HOUR': '1000',
            'BAG FEED-IN': 'Manual Feed',
            'STITCH RANGE': '6.5 – 11mm',
            'FOOT LIFT': '11mm',
            'THREAD CHAIN & TAPE CUTTER': 'Continuously Driven Nibbler Knife',
        },
        features: [
            'Sliding plate with grooved wheels for easy motion.',
            'GK35-6A',
        ],
    },
    {
        id: 'gk-l26',
        name: 'Sliding Board Pedestal',
        category: 'BAG CLOSING MACHINES',
        subcategory: 'Bag Closing Machine Systems',
        description: 'Heavy-duty angle iron traverse system for NP-7A. Allows the sewing head to glide across the bag mouth for consistent closure.',
        image: '/products/Bag Closing Machines/bag_closing_machine_systems/GK-L26.jpg'
    },
    {
        id: 'mw-6-5',
        name: 'Suspended Spring Balancer Unit',
        category: 'SPRING BALANCER',
        subcategory: 'SPRING BALANCER',
        description: 'Complete suspension unit for NP-7A, reducing operator fatigue to zero. Includes balancer and hanger assembly.',
        image: '/products/Bag Closing Machines/bag_closing_machine_systems/MW-6.5.jpg'
    },
    {
        id: 'sm-1',
        name: 'Heavy Duty Heat Sealing System',
        category: 'SEALING MACHINES',
        subcategory: 'Heavy Duty & Specialty',
        description: 'Industrial heavy-duty heat sealer with integrated dust cleaning. Variable temperature control (0-400°C) for thick industrial bags.',
        image: '/products/Sealing Machines/Sealing and Stitching Packaging Machine/SM-1.png',
        specs: {
            'Voltage(V/Hz)': 'AC 380/50',
            'Gross Power(KW': '5',
            'Transmission Power(KW)': '0.75',
            'Motor Power of Sewing Machine(KW)': '0.37',
            'Heating Power(KW)': '0.5×6',
            'Deduster Power(KW)': '0.75',
            'Sealing Speed(m/min)': '8\. 5(limit 11\)',
            'Temperature Range(℃)': '0-400',
            'Net Weight(kg)': '500',
        },
    },

    // Bag Making Machines
    {
        id: 'as-102-hs',
        name: 'High Speed Making Machine (Armstrong)',
        category: 'SEWING MACHINE',
        subcategory: 'SEWING MACHINE',
        description: '2-Needle 4-Thread chain stitch machine for bag manufacturing. High speed (3500 RPM) operation for high volume production.',
        image: '/products/Bag Closing Machines/bag_making_machines/AS-102-HS-1-e1709140399614.png'
    },
    {
        id: 'as-502-hd',
        name: 'Heavy Duty 2-Needle Machine',
        category: 'SEWING MACHINE',
        subcategory: 'SEWING MACHINE',
        description: 'Robust 2-needle machine for thick multi-wall paper or PP material manufacturing.',
        image: '/products/Bag Closing Machines/bag_making_machines/AS-502-HD.png'
    },
    {
        id: 'dkn-3gp',
        name: 'Newlong Industrial Bag Maker',
        category: 'SEWING MACHINE',
        subcategory: 'SEWING MACHINE',
        description: 'Premium Japanese 1-needle 2-thread bag making machine. Ultra-high speed (5000 RPM) for maximum factory throughput.',
        image: '/products/Bag Closing Machines/bag_making_machines/DKN-3WGP-DKN-3BPGP.jpeg'
    },
    {
        id: 'dn-2hs',
        name: 'High Speed Newlong Maker',
        category: 'SEWING MACHINE',
        subcategory: 'SEWING MACHINE',
        description: 'Classic high-speed bag making head from Newlong Japan. Known for reliability and consistent stitch quality at 2800 RPM.',
        image: '/products/Bag Closing Machines/bag_making_machines/DN-2HS.jpg'
    },
    {
        id: 'u561',
        name: 'YaoHan Bag Maker',
        category: 'SEWING MACHINE',
        subcategory: 'SEWING MACHINE',
        description: 'Cost-effective high-speed (5000 RPM) chain stitch machine for woven sack manufacturing.',
        image: '/products/Bag Closing Machines/bag_making_machines/U561.png'
    },

    // Ancillary Equipment
    {
        id: 'belt-conveyor',
        name: 'Industrial Belt Conveyor',
        category: 'BAG CLOSING MACHINES',
        subcategory: 'Conveyors',
        description: 'Heavy-duty slat or belt conveyor for bagging lines. Available in 2.5m to 5m lengths with adjustable speed and guide rails.',
        image: '/products/Bag Closing Machines/conveyors/Belt-Conveyor-e1709141117967.jpg',
        features: [
            'Belt Conveyor – 2500 mm / 3000 mm / 4000 mm / 5000 mm',
        ],
    },
    {
        id: 'cm4900-3',
        name: 'Crepe Tape Infeed',
        category: 'BAG CLOSING THREAD',
        subcategory: 'BAG CLOSING THREAD',
        description: 'Precision crepe tape binding attachment with Mitsubishi motor for smooth tape application.',
        image: '/products/Bag Closing Machines/feeding_device/CM4900-3-e1709141785103.png',
        features: [
            'Bag Infeed for Crepe Tape (Mitsubishi Motor)',
            '# Bag closing thread',
        ],
    },
    {
        id: 'cp4900',
        name: 'Bag Folding Device',
        category: 'BAG CLOSING MACHINES',
        subcategory: 'Feeding Devices',
        description: 'Automatic bag top folding device. Prepares the bag mouth for sewing by creating a clean, strong fold.',
        image: '/products/Bag Closing Machines/feeding_device/CP4900-e1709141518888.png',
        features: [
            'Bag Folding Device',
            'Mitsubishi Motor',
        ],
    },

    // --- PORTABLE BAG CLOSERS ---
    {
        id: 'n600a-12v',
        name: 'Battery Operated Handheld Closer',
        category: 'PORTABLE BAG CLOSERS',
        subcategory: 'Battery Operated',
        description: 'Cordless freedom for field work. 12V battery-operated single thread chain stitch machine.',
        image: '/products/Portable bag closers/Battery Operated Single Needle Single Thread Chain Stitch Machines/N600A-12V-BTN.jpg'
    },
    {
        id: 'kp-3000b',
        name: 'Cordless Bag Closer',
        category: 'PORTABLE BAG CLOSERS',
        subcategory: 'Battery Operated',
        description: 'Lightweight battery-powered bag closer. Ideal for closing bags in warehouses or fields without power access.',
        image: '/products/Portable bag closers/Battery Operated Single Needle Single Thread Chain Stitch Machines/PBC_KP-3000B.png'
    },
    {
        id: 'de-da6',
        name: 'Double Needle Portable',
        category: 'PORTABLE BAG CLOSERS',
        subcategory: 'Double Thread, Double Needle',
        description: 'Double-thread, double-needle portable machine for extra strong closures preventing sifting.',
        image: '/products/Portable bag closers/Double Thread Double Needle Chain Stitch Machines/DE-DA6.jpg'
    },
    {
        id: 'de-da',
        name: 'Heavy Duty Double Stitch',
        category: 'PORTABLE BAG CLOSERS',
        subcategory: 'Double Thread, Double Needle',
        description: 'Industrial grade double-needle portable. Rugged construction for continuous use on thick bags.',
        image: '/products/Portable bag closers/Double Thread Double Needle Chain Stitch Machines/PBC_LPI_DE-DA.png'
    },
    {
        id: 'n620a',
        name: 'N-Series Double Needle',
        category: 'PORTABLE BAG CLOSERS',
        subcategory: 'Double Thread, Double Needle',
        description: 'Double needle version of the popular N600 series. Provides a secure dual-stitch closure.',
        image: '/products/Portable bag closers/Double Thread Double Needle Chain Stitch Machines/PBC_N620A.png'
    },
    {
        id: 'd-2',
        name: 'D-2 Single Needle Portable',
        category: 'PORTABLE BAG CLOSERS',
        subcategory: 'Double Thread, Single Needle',
        description: 'Reliable single needle, double thread portable machine. Offers a stronger seam than localized single thread machines.',
        image: '/products/Portable bag closers/Double Thread Single Needle Chain Stitch Machines/D-2.jpg'
    },
    {
        id: 'dad-r',
        name: 'Heavy Duty Handheld',
        category: 'PORTABLE BAG CLOSERS',
        subcategory: 'Double Thread, Single Needle',
        description: 'Reinforced portable bag closer designed for harsh environments and thicker geotechnical textiles.',
        image: '/products/Portable bag closers/Double Thread Single Needle Chain Stitch Machines/DAD-R.png',
        specs: {
            'Power': '50',
            'Bag Closing Speed': '1800 stitch per minute',
            'Type of Stitch': 'Federal stitch type 101 parallel chain-stitch',
            'Stitch Length': '3.5 stitches/ inch (25.4 mm) Fixed',
            'Model naem': 'frm-1010iii',
            'Max Speed': '1550 rpm',
            'Cutter': 'Half Automatic Thread Cutter',
            'Brand': 'Newlong Industrial',
            'Model name': 'Manual Counter Weighing Scale',
            'Power Requirement': '-** Ac/Dc',
            'Motor': '1/10 Hp 8000 Rpm 220v , 1.5 Amps',
            'Sewing Speed': '1600 – 1800 rpm',
            'Needle': 'DBx1 200/25 (Groz Backert, Germany).',
            'Image naem': 'SM-9',
            'Voltage': 'AC 220/50 110/60',
            'Sealing Power (W)': '2000',
            'Sealing Speed(m/min)': '8\. 5(limit 11\)',
            'Sealing Width(mm)': '** 10',
            'Iamge naem': 'High-Speed-Band-sealer-FRB-770I',
            'Voltage (V/Hz)': 'AC 380/50',
            'Motor Power (W)': '** 100',
            'Speed(m/min)': '0-12',
            'Seal Width(mm)': '10',
            'Imae name': 'FBK-332C',
            'Gross Power(KW': '** 5',
            'Transmission Power(KW)': '0.75',
            'Motor Power of Sewing Machine(KW)': '0.37',
            'Heating Power(KW)': '0.5×6',
            'Deduster Power(KW)': '0.75',
            'Temperature Range(℃)': '0-400',
            'Net Weight(kg)': '** 500',
            'Power source': '** 220 V, 50Hz, 3KW',
            'Heating time (second)': '** 0-10 seconds (Adjustable)',
            'Cooling time (second)': '** 0-10 seconds (Adjustable)',
            'Shifting thermoelectricity device': '** Eight adjustable channel',
            'Pressure area (mm)': '** 500mm; 750mm',
            'Capacity': '10 kg',
            'Qty of mold': '** 1 set for 2 pcs ( produce specially)',
            'Height of packing objects': '** 2mm-150mm (changeable)',
            'Packing material': '** PVC attracting models and revertex card',
            'Machine size': '** 1240mm;1450mm; 1450mm',
            'Weight': '** 170kg',
            'The name is given in website as [Blister Pack Heat Sealer XBF-750](https': '//junko-fze.com/product/blister-pack-heat-sealer-xbf-750/)',
            'Power (W)': '** 1000',
            'Gas Pressure (Mpa)': '** 0.4\~0.6',
            'Max. Carton Size (W×H) (mm)': '** ∞X500X500',
            'Min. Carton Size (W×H) (mm)': '** 130X80X90',
            'Taping Speed (m/min)': '** 20( Fixed mode:25-45 cartons / min ; Automatic mode:10-25 cartons / min )',
            'Adhesive Tape Used': '** BOPP Water-free Adhesive Tape PVC Adhesive Tape',
            'Height of Table (mm)': '** 750',
            'Width of Adhesive Tape (mm)': '** 36,48',
            'Net Weight (kg)': '55',
            'Max. Conveyor Load(kg)': '** 30',
            'Speed (m/min)': '** 0-12 (0-16)',
            'Temperature Range (℃)': '** 0-300',
            'Printing Type': '** Solid-Ink Roller',
            'Distance from Sealing Center to Conveyor Table (mm)': '** 10-40',
            'Distance from Base plate to Interior Conveyor (mm)': '** 65-85',
            'Conveyor Table Size (L × W) (mm)': '** 954×180',
            'Overall Conveyor Loading(kg)': '** ≤10',
            'Printing Heating Power (W)': '40×2',
            'Sealing Width (mm)': '** 10',
            'Conveyor Table Size (L × W)': '** 1065×205',
            'Overall Conveyor Loading (kg)': '≤10',
            'Max. Strapping Size (L×H) (mm)': '** 800\*600',
            'Strapping Speed (sec/cycle)': '** ≤2.5',
            'Strapping Force (V/hz) (N)': '** 25-700 (Adjustable)',
            'Width of Strap Used (mm)': '** Plastic strap 9-15, thickness 0.5-1.1',
            'Net  Weight (kg)': '** 240',
            'Max Loading Weight(kg)': '** 30',
            'Air Source (MPa)': '0.5 – 0.6',
            'Chamber Dimension (L×W×H)': '284×(200-400）',
            'Max. Stretch depth (mm)': '≤80',
            'Vacuum Pump capacity (m3/h)': '100 or 160 or 200',
            'Capacity (Times/min)': '4 – 6 times/min',
            'Cooling Type': 'Water – cooling',
            'Net Weight (Kg)': 'Approx.1500',
            '[**Animal Scale**](https': '//junko-fze.com/product/animal-scale/)**(image name:asss.jpg)**',
            '[**Pallet Scale**](https': '//junko-fze.com/product/pallet-scale/)**(image name:pallet-scale-1734x2048)**',
            '[**Platform Type Weighing Scale**](https': '//junko-fze.com/product/platform-type-weighing-scale/)**(image name:Platform\_Type)**',
            '[**Heavy Platform**](https': '//junko-fze.com/product/heavy-platform/)**(image name:heavy\_platform)**',
            'Description': 'Manual Counter Weighing Scale',
            '[**Price Computing**](https': '//junko-fze.com/product/price-computing/)**(image name:Price\_Computing)**',
            '[**Mini Bench Model**](https': '//junko-fze.com/product/mini-bench-model/)**(image name:Bench\_Model\_Mini)**',
            '[**Bench Platform Weighing Scale**](https': '//junko-fze.com/product/bench-platform-weighing-scale/)**(image name:Bench\_Model)**',
            '[**Table Top Weighing Scale**](https': '//junko-fze.com/product/table-top-weighing-scale/)**(image name:Table\_Top)**',
            'Descripotn': 'Manual Platform Weighing Scale',
            '[**Field Scale**](https': '//junko-fze.com/product/field-scale/)**(image name:Field\_Scale)**',
            '[**Jewellery Scale**](https': '//junko-fze.com/product/jewellery-scale/)**(image name:Jewelley\_Scale)**',
            'Model  name': '[**Manual Platform Weighing Scale**](https://junko-fze.com/product/manual-platform-weighing-scale/)',
        },
        features: [
            '## Bag Closing Machine,',
            'NP-311 is a Double Thread Chain Stitch Machine',
            '##### **Made in Japan**',
            '### **Heavy Duty 2 Thread Machine**',
            'Combined upper and lower feed grips both sides of material',
            'Built in thread chain cutter',
            'Adjustable stitch length',
            '#### Double Thread Double Needle Chain Stitch Machines',
            '### **High Speed Bag Closing Machine**',
            'Two Needle Two Thread Machine',
            'With Mechanical Clutter',
            '### **Portable Bag Closer, LPI DE-DA**',
            'Double Needle Double Thread Chain Stitch Machine',
            'Made in India',
            '# Sealing macines',
            '### Hand Impulse Sealer',
            '### Hand Impulse Sealer with Cutter',
            '### Plastic Bag Heat Sealer',
            '### Pedal Impulse Sealer',
            '### Table Style Pedal Impulse Sealer',
            '### High Speed Band Sealer',
            '### **Continuous Band Sealer FRB-770I**',
            '### Horizontal Sealing Machine',
            '## FRM-1120LD Band Sealer',
            'Image name; FRM-1120LD',
            '### Continuous Band Sealer Head',
            '### Thickness Bag Band Sealer',
            '● Well suited for heavy content bag sealing.',
            '### Pneumatic Heavy Bag Sealer',
            '### Heavy Duty Bag Sealing Machine',
            '### Sealing and Stitching Packaging Machine',
            '### Sealing and Stitching Automatic Packaging Machine',
            'Next',
            '## Blister Pack Heat Sealer XBF-750',
            '## Carton Sealing Machine FXJ-5050QS',
            '#### Below are Solid Ink Coding Band Sealer',
            'Next',
            '## Strapping Machine KZ-8060/D',
            '# weighing scales',
            '## Jewellery Scale',
        ],
    },
    {
        id: '2200a',
        name: 'Standard Portable Closer',
        category: 'PORTABLE BAG CLOSERS',
        subcategory: 'Double Thread, Single Needle',
        description: 'Economical and reliable portable bag closer for general purpose applications.',
        image: '/products/Portable bag closers/Double Thread Single Needle Chain Stitch Machines/PBC_2200A.png'
    },
    {
        id: 'np-311',
        name: 'NP-311 Portable',
        category: 'PORTABLE BAG CLOSERS',
        subcategory: 'Double Thread, Single Needle',
        description: 'Double thread portable machine known for its high speed and ease of maintenance.',
        image: '/products/Portable bag closers/Double Thread Single Needle Chain Stitch Machines/PBC_NP-311.png'
    },
    {
        id: 'np-7a',
        name: 'Newlong NP-7A',
        category: 'PORTABLE BAG CLOSERS',
        subcategory: 'Single Needle, Single Thread (Chain Stitch)',
        description: 'The industry standard. High-speed, single-thread chain stitch portable machine with oil pump lubrication.',
        image: '/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/NP-7A.jpg',
        specs: {
            'Brand': 'LPI, Made in India',
            'Maximum Speed': '1700 – 1900 rpm',
            'Type of stitch': 'Single Thread Chain Stitch',
            'Model name': 'DA-C**',
            'Speed': '1500 – 1800 rpm',
            'Type of Stitch': 'Single Thread Chain Stitch',
            'Sewing Speed': '1600 – 1800 stitches per minute',
            'Dimension': '44cm × 29cm × 36cm',
        },
        featured: true,
        features: [
            'Made in Japan',
            '### Portable Bag Closer,',
            'Single Needle Chain Stitch Machine',
            '### **Portable Bag Closing Machine, GNP-7A**',
            'Single Needle Chain Stitch Machine',
            'Automatic Lubrication to reduce wear & tear',
            'High speed motor with semiautomatic thread cutter',
            '### **Portable Bag Closer,**',
            'With Mechanical Cutter outside',
            '### Portable Bag Closing Machine',
        ],
    },
    {
        id: 'np-7a-tape',
        name: 'Tape Attachment Portable',
        category: 'PORTABLE BAG CLOSERS',
        subcategory: 'Single Needle',
        description: 'NP-7A modified with a crepe tape binding attachment for sealing bags with a paper tape closure.',
        image: '/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/Crepe-tape-attachment-NP-7A.jpg'
    },
    {
        id: 'pbc-fischbein',
        name: 'Fischbein Model F Type',
        category: 'PORTABLE BAG CLOSERS',
        subcategory: 'PORTABLE BAG CLOSERS',
        description: 'Classic design portable closer. Known for extreme durability and ability to sew through thick multi-wall paper.',
        image: '/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/PBC_Fischbein_Model.png',
        featured: true
    },
    {
        id: 'np-7h',
        name: 'Horizontal Portable Closer',
        category: 'PORTABLE BAG CLOSERS',
        subcategory: 'Single Needle, Single Thread (Chain Stitch)',
        description: 'Horizontal handle configuration of the NP-7A, designed for closing horizontal bags on a conveyor or table.',
        image: '/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/NP-7H.jpg',
        specs: {
            'Image naem': 'NP-7H',
        },
    },
    {
        id: 'gk-9-2',
        name: 'Economy Portable',
        category: 'PORTABLE BAG CLOSERS',
        subcategory: 'Single Needle, Single Thread (Chain Stitch)',
        description: 'Lightweight and affordable flywheel-type portable bag closer for low-volume applications.',
        image: '/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/PBC_GK-9-2.png'
    },
    {
        id: 'kp-2701',
        name: 'KP-2701 Portable',
        category: 'PORTABLE BAG CLOSERS',
        subcategory: 'Single Needle, Single Thread (Chain Stitch)',
        description: 'Robust single thread portable machine, excellent for PP woven and jute bags.',
        image: '/products/Portable bag closers/Single Needle Single Thread Chain Stitch Machines/PBC_KP2701.png'
    },

    // --- CARPET OVEREDGING & SEWING ---
    {
        id: 'rpe-2500',
        name: 'External Density Adjuster',
        category: 'CARPET OVEREDGING MACHINES',
        subcategory: 'Overedgers',
        description: 'Carpet machine with external stitch density lever. Allows instant adjustment of stitch density without tools.',
        image: '/products/Carpet_overedging_machines/COEM_1-1.jpg'
    },
    {
        id: 'titan-2500ahc-3',
        name: '3-Thread Carpet Overedger',
        category: 'BAG CLOSING THREAD',
        subcategory: 'BAG CLOSING THREAD',
        description: '3-Thread heavy duty machine for overedging car mats, airplane carpets, and boat mats.',
        image: '/products/Carpet_overedging_machines/COEM_6.jpg'
    },
    {
        id: 'titan-2500ahc',
        name: '2-Thread Carpet Overedger',
        category: 'BAG CLOSING THREAD',
        subcategory: 'BAG CLOSING THREAD',
        description: 'Standard 2-thread overedging machine (Titan type). Perfect for finishing edges of rugs and mats.',
        image: '/products/Carpet_overedging_machines/COEM_7.jpg'
    },
    {
        id: 'titan-2530ahc',
        name: 'Carpet Tape Binder',
        category: 'CARPET OVEREDGING MACHINES',
        subcategory: 'General',
        description: 'Specialized machine for applying binding tape around the edge of car mats and bath mats.',
        image: '/products/Carpet_overedging_machines/Movable Carpet Overedging Machine/COEM_8.jpg'
    },
    {
        id: 'titan-4510che',
        name: 'Heavy Duty Buttseamer',
        category: 'CARPET OVEREDGING MACHINES',
        subcategory: 'General',
        description: 'Buttseaming machine for joining two pieces of carpet or heavy textile. Features heavy cutting knives to trim excess.',
        image: '/products/Carpet_overedging_machines/Carpet Heavy Duty Buttseamer/TITAN-4510CHE-1536x678.png'
    },
    {
        id: '2502wd-2',
        name: 'Movable Carpet Overedger',
        category: 'CARPET OVEREDGING MACHINES',
        subcategory: 'Overedgers',
        description: 'Portable/Movable carpet overedging machine on wheels. Ideal for working on large carpets that cannot be moved.',
        image: '/products/Carpet_overedging_machines/Movable Carpet Overedging Machine/2502WD-2.webp'
    },
    {
        id: 'titan-2200nc',
        name: 'Fringing Machine',
        category: 'CARPET OVEREDGING MACHINES',
        subcategory: 'CARPET OVEREDGING MACHINES',
        description: 'Special machine for sewing cut or uncut fringes onto carpets, blankets, or shawls.',
        image: '/products/Carpet_overedging_machines/TITAN 2200NC, Special Fringing Machine to sew cut or uncut fringes/TITAN-2200-1536x681.png'
    },

    // --- FILLING & PACKING ---
    {
        id: 'flg-500a',
        name: 'Auger Powder Filler',
        category: 'FILLING AND PACKING MACHINES',
        subcategory: 'FILLING AND PACKING MACHINES',
        description: 'Semi-automatic auger filler for non-free flowing powders like flour, spices, and chemicals.',
        image: '/products/Filling and packing machines/Automatic weighing filling machine/FLG-500A.png'
    },
    {
        id: 'cjs-25ih',
        name: 'Automatic Electronic Scale',
        category: 'FILLING AND PACKING MACHINES',
        subcategory: 'FILLING AND PACKING MACHINES',
        description: 'High-precision gravity feed weighing machine for granules. Features digital display and pneumatic gate control.',
        image: '/products/Filling and packing machines/Automatic weighing filling machine/PM-1.png'
    },
    {
        id: 'cjd-25iiz',
        name: 'Vibratory Feed Scale',
        category: 'FILLING AND PACKING MACHINES',
        subcategory: 'FILLING AND PACKING MACHINES',
        description: 'Electronic weighing and filling machine with vibration feeder. Ideal for difficult-to-flow materials.',
        image: '/products/Filling and packing machines/Automatic weighing filling machine/PM-2.png'
    },
    {
        id: 'pm-4',
        name: 'Small Dosing Machine',
        category: 'FILLING AND PACKING MACHINES',
        subcategory: 'Fillers',
        description: 'Compact filling machine for small pouches (50-250ml). Ideal for seeds, tea, and small granular products.',
        image: '/products/Filling and packing machines/Automatic weighing filling machine/PM-4.png'
    },
    {
        id: 'bs-4535la',
        name: 'Shrink Tunnel',
        category: 'FILLING AND PACKING MACHINES',
        subcategory: 'Shrink Packaging',
        description: 'High-efficiency heat shrink tunnel. Circulates heated air to shrink film tightly around products.',
        image: '/products/Filling and packing machines/Shrink Packaging Machine/BS-4535LA.png'
    },
    {
        id: 'bsf-5540a',
        name: '2-in-1 Sealer & Shrink',
        category: 'FILLING AND PACKING MACHINES',
        subcategory: 'Shrink Packaging',
        description: 'Chamber machine that cuts, seals, and shrinks in one operation. Transparent hood allows monitoring of the process.',
        image: '/products/Filling and packing machines/Shrink Packaging Machine/BSF-5540A.png'
    },
    {
        id: 'bsl-5045l',
        name: 'L-Bar Sealer',
        category: 'FILLING AND PACKING MACHINES',
        subcategory: 'Shrink Packaging',
        description: 'L-bar sealer for cutting and sealing shrink film around products before entering the tunnel.',
        image: '/products/Filling and packing machines/Shrink Packaging Machine/BSL-5045L.png'
    },
    {
        id: 'kz-8060d',
        name: 'Automatic Strapping Machine',
        category: 'PACKAGING TOOLS',
        subcategory: 'PACKAGING TOOLS',
        description: 'High-speed fully automatic arch strapping machine. Features PLC control and auto-feed.',
        image: '/products/Filling and packing machines/Strapping machine/KZ-8060D.png'
    },
    {
        id: 'kzb-1',
        name: 'Semi-Auto Strapping Machine',
        category: 'PACKAGING TOOLS',
        subcategory: 'PACKAGING TOOLS',
        description: 'The industry standard open-cabinet strapping machine. Reliable, fast, and easy to maintain.',
        image: '/products/Filling and packing machines/Strapping machine/KZB-1.png'
    },
    {
        id: 'kzb-a',
        name: 'Manual Strapping Table',
        category: 'PACKAGING MATERIALS',
        subcategory: 'PACKAGING MATERIALS',
        description: 'Low-profile strapping machine designed for heavy or large boxes that are hard to lift.',
        image: '/products/Filling and packing machines/Strapping machine/KZB-A.png'
    },
    {
        id: 'fxj-4040a',
        name: 'Carton Sealer (Small)',
        category: 'FILLING AND PACKING MACHINES',
        subcategory: 'Carton Sealers',
        description: 'Top and bottom drive carton sealer for uniform small-to-medium boxes. Applies tape automatically.',
        image: '/products/Filling and packing machines/carton sealer/FXJ-4040A.png'
    },
    {
        id: 'fxj-5050a',
        name: 'Heavy Duty Carton Sealer',
        category: 'FILLING AND PACKING MACHINES',
        subcategory: 'Carton Sealers',
        description: 'Robust side-drive carton sealer. Handles heavier boxes with stability and precision taping.',
        image: '/products/Filling and packing machines/carton sealer/FXJ-5050A.png'
    },
    {
        id: 'fxj-8070b',
        name: 'Auto-Flap Carton Sealer',
        category: 'FILLING AND PACKING MACHINES',
        subcategory: 'Carton Sealers',
        description: 'Automatic carton sealer with top flap folding device. Closes flaps and tapes top and bottom automatically.',
        image: '/products/Filling and packing machines/carton sealer/FXJ-8070B.png'
    },

    // --- STRAPPING TOOLS ---
    {
        id: 'pst-series',
        name: 'Pneumatic Strapping Tool',
        category: 'PACKAGING TOOLS',
        subcategory: 'Sealers & Powered Tools',
        description: 'Powerful air-operated tool for friction welding PET/PP straps. High tension force for heavy loads.',
        image: '/products/Packaging tools/Strapping tools/20210929173700_40350.jpg'
    },
    {
        id: 'bst-auto',
        name: 'Battery Strapping Tool',
        category: 'PACKAGING TOOLS',
        subcategory: 'Battery',
        description: 'One-button automatic battery tool. Tensions, welds, and cuts strap with a single press.',
        image: '/products/Packaging tools/Strapping tools/20240416100026_41086.jpg'
    },
    {
        id: 'cst-standard',
        name: 'Cord Strap Tensioner',
        category: 'PACKAGING TOOLS',
        subcategory: 'Manual',
        description: 'Manual tensioner for woven cord strapping. Heavy-duty steel construction.',
        image: '/products/Packaging tools/Strapping tools/20211011144058_21896.jpg'
    },
    {
        id: 'pss-jwc',
        name: 'Poly Strap Sealer',
        category: 'PACKAGING TOOLS',
        subcategory: 'Manual',
        description: 'Long-handle sealer for crimping metal seals onto poly strapping.',
        image: '/products/Packaging tools/Strapping tools/20211014160509_88035-2.jpg'
    },

    // --- CONSUMABLES & PARTS ---
    {
        id: 'thread-poly-20s6',
        name: 'Industrial Bag Closing Thread',
        category: 'BAG CLOSING THREAD',
        subcategory: 'BAG CLOSING THREAD',
        description: 'High tensile 100% polyester thread (20s/6). Silicone treated for heat resistance during high-speed sewing.',
        image: '/products/Bag_closing_threads/Thread_7.jpg'
    },
    {
        id: 'crepe-tape',
        name: 'Crepe Paper Tape',
        category: 'CONSUMABLES',
        subcategory: 'Others',
        description: 'Premium crepe paper tape for binding bag mouths. Available in 50mm and 70mm widths.',
        image: '/products/consumables/Crepe paper tape/Crepe_paper_tape.png'
    },
    {
        id: 'junko-oil',
        name: 'Sewing Machine Oil',
        category: 'CONSUMABLES',
        subcategory: 'Others',
        description: 'Specially formulated clear oil for high-speed bag closing machines. Prevents rust and reduces wear.',
        image: '/products/consumables/Oil for sewing machine/SWOil-e1708935103355.png'
    },
    {
        id: 'sb-series',
        name: 'SPRING BALANCER',
        category: 'SPRING BALANCER',
        subcategory: 'SPRING BALANCER',
        description: 'Retractable tool balancer to suspend portable bag closers. Makes the machine weightless for the operator.',
        image: '/products/consumables/Spring balancers/spring_balancers_all.png'
    },
    {
        id: 'needles-fischbein',
        name: 'Fischbein Needles',
        category: 'SPARE PARTS',
        subcategory: 'SPARE PARTS',
        description: 'Genuine needles for Fischbein heads. Precision engineered for smooth penetration of multi-wall bags.',
        image: '/products/consumables/Needles/Fischbein_needles.png'
    },
    {
        id: 'needles-gb',
        name: 'Groz-Beckert Needles',
        category: 'SPARE PARTS',
        subcategory: 'SPARE PARTS',
        description: 'Premium German needles. Titanium coated options available for extreme durability.',
        image: '/products/consumables/Needles/Groz_beckert_needles-e1708936853463.png'
    },

    // --- WEIGHING SCALES ---
    {
        id: 'scale-bench',
        name: 'Bench Platform Scale',
        category: 'WEIGHING SCALES',
        subcategory: 'WEIGHING SCALES',
        description: 'Stainless steel pole display bench scale. Heavy duty platform for industrial weighing.',
        image: '/products/weighing scales/Electronic Weighing Scales/Bench_Model.png'
    },
    {
        id: 'scale-pallet',
        name: 'Pallet Scale',
        category: 'WEIGHING SCALES',
        subcategory: 'WEIGHING SCALES',
        description: 'U-beam pallet scale for weighing pallet jacks directly. heavy capacity up to 3 tons.',
        image: '/products/weighing scales/Electronic Weighing Scales/pallet-scale-1734x2048.jpg'
    },
    {
        id: 'scale-price',
        name: 'Digital Computing Scale',
        category: 'WEIGHING SCALES',
        subcategory: 'Retail',
        description: 'Retail price computing scale with dual display. Rechargeable battery for mobile use.',
        image: '/products/weighing scales/Electronic Weighing Scales/Price_Computing.png'
    },
    {
        id: 'scale-waterproof',
        name: 'Waterproof Table Top',
        category: 'WEIGHING SCALES',
        subcategory: 'Retail',
        description: 'Fully waterproof stainless steel scale (IP68). Ideal for seafood and wet processing environments.',
        image: '/products/weighing scales/Electronic Weighing Scales/table_top_water_proof.png'
    }
];

export const categories: Category[] = Array.from(new Set(allProducts.map(p => p.category)))
    .sort()
    .map(categoryName => {
        const subcats = Array.from(new Set(
            allProducts
                .filter(p => p.category === categoryName)
                .map(p => p.subcategory || 'General')
        )).sort();

        return {
            name: categoryName,
            subcategories: subcats
        };
    });

export const featuredProducts = allProducts.filter(p => p.featured);

export const productsByCategory = allProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
        acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
}, {} as Record<string, Product[]>);
