export const cities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad',
    'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow',
    'Surat', 'Nagpur', 'Indore', 'Bhopal', 'Chandigarh',
    'Coimbatore', 'Kochi', 'Visakhapatnam', 'Raipur', 'Patna'
];

export const truckTypes = [
    { value: 'open_body', label: 'Open Body', capacity: '9-16 Ton' },
    { value: 'container', label: 'Container', capacity: '7-25 Ton' },
    { value: 'trailer', label: 'Trailer', capacity: '20-40 Ton' },
    { value: 'flatbed', label: 'Flatbed', capacity: '15-25 Ton' },
    { value: 'tanker', label: 'Tanker', capacity: '10-24 KL' },
    { value: 'lcv', label: 'LCV (Mini Truck)', capacity: '1-5 Ton' },
    { value: 'hcv', label: 'HCV', capacity: '16-25 Ton' },
    { value: 'tipper', label: 'Tipper', capacity: '10-25 Ton' },
];

export const materialTypes = [
    'Electronics', 'FMCG', 'Textiles', 'Machinery', 'Chemicals',
    'Building Materials', 'Furniture', 'Automobile Parts', 'Food Grains',
    'Pharmaceuticals', 'Steel & Iron', 'Paper & Packaging', 'Coal', 'Cement'
];

export const loads = [
    {
        id: 'L001', from: 'Delhi', to: 'Mumbai', material: 'Electronics',
        weight: 12, truckType: 'container', price: 45000, pickupTime: '2026-02-28T08:00:00', description: 'LCD TVs and monitors packed in wooden crates. Fragile cargo — needs careful handling.',
        postedBy: 'T001', status: 'open', bids: ['B001', 'B002'], createdAt: '2026-02-25T10:30:00',
    },
    {
        id: 'L002', from: 'Bangalore', to: 'Chennai', material: 'FMCG',
        weight: 8, truckType: 'container', price: 18000, pickupTime: '2026-02-27T06:00:00', description: 'Packaged food items and beverages for retail distribution.',
        postedBy: 'T002', status: 'open', bids: ['B003'], createdAt: '2026-02-25T09:15:00',
    },
    {
        id: 'L003', from: 'Mumbai', to: 'Pune', material: 'Furniture',
        weight: 6, truckType: 'open_body', price: 12000, pickupTime: '2026-03-01T10:00:00', description: 'Office furniture including desks and chairs. Assembly required at destination.',
        postedBy: 'T003', status: 'open', bids: [], createdAt: '2026-02-25T08:00:00',
    },
    {
        id: 'L004', from: 'Hyderabad', to: 'Bangalore', material: 'Pharmaceuticals',
        weight: 4, truckType: 'container', price: 22000, pickupTime: '2026-02-27T14:00:00', description: 'Temperature-sensitive pharmaceutical products. Requires covered vehicle.',
        postedBy: 'T004', status: 'open', bids: ['B004'], createdAt: '2026-02-24T18:30:00',
    },
    {
        id: 'L005', from: 'Delhi', to: 'Jaipur', material: 'Textiles',
        weight: 10, truckType: 'open_body', price: 15000, pickupTime: '2026-02-26T07:00:00', description: 'Fabric rolls and garments for wholesale market delivery.',
        postedBy: 'T001', status: 'assigned', bids: ['B005'], createdAt: '2026-02-24T14:00:00',
    },
    {
        id: 'L006', from: 'Kolkata', to: 'Patna', material: 'Food Grains',
        weight: 20, truckType: 'trailer', price: 35000, pickupTime: '2026-03-02T05:00:00', description: 'Rice and wheat bags for warehouse delivery.',
        postedBy: 'T005', status: 'open', bids: [], createdAt: '2026-02-24T11:00:00',
    },
    {
        id: 'L007', from: 'Ahmedabad', to: 'Mumbai', material: 'Chemicals',
        weight: 15, truckType: 'tanker', price: 38000, pickupTime: '2026-03-01T09:00:00', description: 'Industrial-grade chemicals in sealed drums. Hazardous material handling required.',
        postedBy: 'T006', status: 'open', bids: ['B006'], createdAt: '2026-02-24T09:00:00',
    },
    {
        id: 'L008', from: 'Chennai', to: 'Coimbatore', material: 'Automobile Parts',
        weight: 7, truckType: 'container', price: 16000, pickupTime: '2026-02-28T11:00:00', description: 'Engine components and spare parts for auto workshop.',
        postedBy: 'T002', status: 'open', bids: [], createdAt: '2026-02-23T16:00:00',
    },
    {
        id: 'L009', from: 'Pune', to: 'Nagpur', material: 'Steel & Iron',
        weight: 25, truckType: 'flatbed', price: 52000, pickupTime: '2026-03-03T06:00:00', description: 'Steel rods and iron sheets for construction site.',
        postedBy: 'T003', status: 'open', bids: ['B007', 'B008'], createdAt: '2026-02-23T12:00:00',
    },
    {
        id: 'L010', from: 'Lucknow', to: 'Delhi', material: 'Building Materials',
        weight: 18, truckType: 'tipper', price: 28000, pickupTime: '2026-03-04T07:00:00', description: 'Sand and aggregate for construction project.',
        postedBy: 'T007', status: 'open', bids: [], createdAt: '2026-02-23T08:00:00',
    },
    {
        id: 'L011', from: 'Surat', to: 'Ahmedabad', material: 'Textiles',
        weight: 5, truckType: 'lcv', price: 8000, pickupTime: '2026-02-25T09:00:00', description: 'Finished garments for retail stores.',
        postedBy: 'T008', status: 'completed', bids: ['B009'], createdAt: '2026-02-22T14:00:00',
    },
    {
        id: 'L012', from: 'Indore', to: 'Bhopal', material: 'FMCG',
        weight: 9, truckType: 'container', price: 14000, pickupTime: '2026-03-02T08:00:00', description: 'Household cleaning products and personal care items.',
        postedBy: 'T009', status: 'open', bids: [], createdAt: '2026-02-22T10:00:00',
    },
    {
        id: 'L013', from: 'Mumbai', to: 'Delhi', material: 'Machinery',
        weight: 22, truckType: 'trailer', price: 65000, pickupTime: '2026-03-05T06:00:00', description: 'Industrial CNC machine. Oversized cargo — needs special trailer.',
        postedBy: 'T003', status: 'open', bids: ['B010', 'B011', 'B012'], createdAt: '2026-02-22T08:00:00',
    },
    {
        id: 'L014', from: 'Bangalore', to: 'Hyderabad', material: 'Electronics',
        weight: 3, truckType: 'lcv', price: 11000, pickupTime: '2026-03-01T12:00:00', description: 'Server racks and networking equipment.',
        postedBy: 'T004', status: 'open', bids: [], createdAt: '2026-02-21T16:00:00',
    },
    {
        id: 'L015', from: 'Chandigarh', to: 'Delhi', material: 'Paper & Packaging',
        weight: 14, truckType: 'open_body', price: 19000, pickupTime: '2026-02-28T07:00:00', description: 'Corrugated boxes and packaging material for e-commerce fulfillment.',
        postedBy: 'T010', status: 'open', bids: ['B013'], createdAt: '2026-02-21T10:00:00',
    },
    {
        id: 'L016', from: 'Kochi', to: 'Chennai', material: 'Food Grains',
        weight: 16, truckType: 'hcv', price: 32000, pickupTime: '2026-03-03T05:30:00', description: 'Spices and coconut oil in bulk containers.',
        postedBy: 'T011', status: 'open', bids: [], createdAt: '2026-02-21T08:00:00',
    },
    {
        id: 'L017', from: 'Visakhapatnam', to: 'Hyderabad', material: 'Cement',
        weight: 24, truckType: 'tipper', price: 28000, pickupTime: '2026-03-02T06:00:00', description: 'Cement bags for construction supply chain.',
        postedBy: 'T012', status: 'open', bids: ['B014'], createdAt: '2026-02-20T14:00:00',
    },
    {
        id: 'L018', from: 'Raipur', to: 'Nagpur', material: 'Coal',
        weight: 30, truckType: 'tipper', price: 40000, pickupTime: '2026-03-04T05:00:00', description: 'Coal for industrial use. Open tipper required.',
        postedBy: 'T005', status: 'open', bids: [], createdAt: '2026-02-20T10:00:00',
    },
    {
        id: 'L019', from: 'Jaipur', to: 'Ahmedabad', material: 'Textiles',
        weight: 11, truckType: 'open_body', price: 21000, pickupTime: '2026-03-01T08:00:00', description: 'Handloom fabric and traditional garments.',
        postedBy: 'T008', status: 'open', bids: ['B015'], createdAt: '2026-02-20T08:00:00',
    },
    {
        id: 'L020', from: 'Delhi', to: 'Lucknow', material: 'Pharmaceuticals',
        weight: 2, truckType: 'lcv', price: 9000, pickupTime: '2026-02-27T10:00:00', description: 'Medical supplies and OTC medicines.',
        postedBy: 'T007', status: 'open', bids: [], createdAt: '2026-02-19T16:00:00',
    },
];

export const trucks = [
    {
        id: 'TR001', owner: 'T006', type: 'container', make: 'Tata Motors',
        model: 'Tata 407', registrationNo: 'DL-01-AB-1234', capacity: 12,
        currentCity: 'Delhi', availableRoutes: ['Delhi-Mumbai', 'Delhi-Jaipur', 'Delhi-Chandigarh'],
        isAvailable: true, rating: 4.5, tripsCompleted: 234, createdAt: '2026-01-15T10:00:00',
    },
    {
        id: 'TR002', owner: 'T006', type: 'open_body', make: 'Ashok Leyland',
        model: 'Ecomet 1215', registrationNo: 'MH-04-CD-5678', capacity: 15,
        currentCity: 'Mumbai', availableRoutes: ['Mumbai-Pune', 'Mumbai-Ahmedabad', 'Mumbai-Nagpur'],
        isAvailable: true, rating: 4.2, tripsCompleted: 189, createdAt: '2026-01-20T10:00:00',
    },
    {
        id: 'TR003', owner: 'T009', type: 'trailer', make: 'Bharat Benz',
        model: '5028T', registrationNo: 'KA-01-EF-9012', capacity: 28,
        currentCity: 'Bangalore', availableRoutes: ['Bangalore-Chennai', 'Bangalore-Hyderabad'],
        isAvailable: false, rating: 4.8, tripsCompleted: 312, createdAt: '2026-01-10T10:00:00',
    },
    {
        id: 'TR004', owner: 'T010', type: 'lcv', make: 'Mahindra',
        model: 'Bolero Pikup', registrationNo: 'TN-09-GH-3456', capacity: 3,
        currentCity: 'Chennai', availableRoutes: ['Chennai-Bangalore', 'Chennai-Coimbatore'],
        isAvailable: true, rating: 4.0, tripsCompleted: 87, createdAt: '2026-02-01T10:00:00',
    },
    {
        id: 'TR005', owner: 'T011', type: 'tanker', make: 'Tata Motors',
        model: 'Signa 4825.TK', registrationNo: 'GJ-05-IJ-7890', capacity: 24,
        currentCity: 'Ahmedabad', availableRoutes: ['Ahmedabad-Mumbai', 'Ahmedabad-Surat'],
        isAvailable: true, rating: 4.6, tripsCompleted: 156, createdAt: '2026-01-25T10:00:00',
    },
    {
        id: 'TR006', owner: 'T012', type: 'flatbed', make: 'Eicher',
        model: 'Pro 6025', registrationNo: 'RJ-14-KL-2345', capacity: 25,
        currentCity: 'Jaipur', availableRoutes: ['Jaipur-Delhi', 'Jaipur-Ahmedabad'],
        isAvailable: true, rating: 4.3, tripsCompleted: 201, createdAt: '2026-02-05T10:00:00',
    },
    {
        id: 'TR007', owner: 'T006', type: 'hcv', make: 'Ashok Leyland',
        model: 'Captain 2523', registrationNo: 'TS-08-MN-6789', capacity: 23,
        currentCity: 'Hyderabad', availableRoutes: ['Hyderabad-Bangalore', 'Hyderabad-Visakhapatnam'],
        isAvailable: true, rating: 4.7, tripsCompleted: 278, createdAt: '2026-01-18T10:00:00',
    },
    {
        id: 'TR008', owner: 'T009', type: 'tipper', make: 'Tata Motors',
        model: 'Prima 2530.K', registrationNo: 'WB-02-OP-1234', capacity: 25,
        currentCity: 'Kolkata', availableRoutes: ['Kolkata-Patna', 'Kolkata-Raipur'],
        isAvailable: true, rating: 4.1, tripsCompleted: 143, createdAt: '2026-02-10T10:00:00',
    },
    {
        id: 'TR009', owner: 'T010', type: 'container', make: 'Volvo',
        model: 'FM 380', registrationNo: 'UP-32-QR-5678', capacity: 20,
        currentCity: 'Lucknow', availableRoutes: ['Lucknow-Delhi', 'Lucknow-Patna'],
        isAvailable: false, rating: 4.9, tripsCompleted: 345, createdAt: '2026-01-05T10:00:00',
    },
    {
        id: 'TR010', owner: 'T011', type: 'lcv', make: 'Tata Motors',
        model: 'Tata Ace', registrationNo: 'MH-12-ST-9012', capacity: 1.5,
        currentCity: 'Pune', availableRoutes: ['Pune-Mumbai', 'Pune-Nagpur'],
        isAvailable: true, rating: 3.9, tripsCompleted: 56, createdAt: '2026-02-15T10:00:00',
    },
    {
        id: 'TR011', owner: 'T012', type: 'open_body', make: 'Eicher',
        model: 'Pro 3019', registrationNo: 'GJ-01-UV-3456', capacity: 19,
        currentCity: 'Surat', availableRoutes: ['Surat-Ahmedabad', 'Surat-Mumbai'],
        isAvailable: true, rating: 4.4, tripsCompleted: 167, createdAt: '2026-02-08T10:00:00',
    },
    {
        id: 'TR012', owner: 'T006', type: 'container', make: 'Bharat Benz',
        model: '1217C', registrationNo: 'MP-09-WX-7890', capacity: 17,
        currentCity: 'Indore', availableRoutes: ['Indore-Bhopal', 'Indore-Mumbai'],
        isAvailable: true, rating: 4.2, tripsCompleted: 112, createdAt: '2026-02-12T10:00:00',
    },
    {
        id: 'TR013', owner: 'T009', type: 'trailer', make: 'Ashok Leyland',
        model: 'U-4923', registrationNo: 'KL-07-YZ-2345', capacity: 35,
        currentCity: 'Kochi', availableRoutes: ['Kochi-Chennai', 'Kochi-Bangalore'],
        isAvailable: true, rating: 4.6, tripsCompleted: 198, createdAt: '2026-01-28T10:00:00',
    },
    {
        id: 'TR014', owner: 'T010', type: 'tipper', make: 'Tata Motors',
        model: 'LPK 2518', registrationNo: 'AP-39-AB-6789', capacity: 18,
        currentCity: 'Visakhapatnam', availableRoutes: ['Visakhapatnam-Hyderabad'],
        isAvailable: true, rating: 4.0, tripsCompleted: 89, createdAt: '2026-02-03T10:00:00',
    },
    {
        id: 'TR015', owner: 'T011', type: 'hcv', make: 'Volvo',
        model: 'FH 440', registrationNo: 'CG-04-CD-1234', capacity: 40,
        currentCity: 'Raipur', availableRoutes: ['Raipur-Nagpur', 'Raipur-Kolkata'],
        isAvailable: false, rating: 4.8, tripsCompleted: 267, createdAt: '2026-01-12T10:00:00',
    },
];

export const transporters = [
    {
        id: 'T001', name: 'Sharma Transport Co.', email: 'sharma@email.com', phone: '+91 98765 43210',
        role: 'shipper', companyName: 'Sharma Transport Co.', gstNumber: '07AABCS1429B1Z1',
        rating: 4.5, verified: true, fleetSize: 12, totalLoads: 89, memberSince: '2024-03-15',
        city: 'Delhi', avatar: null,
        reviews: [
            { by: 'Patel Logistics', rating: 5, text: 'Very reliable and punctual delivery every time.', date: '2026-02-15' },
            { by: 'Singh Freight', rating: 4, text: 'Good service, fair pricing.', date: '2026-01-20' },
        ]
    },
    {
        id: 'T002', name: 'Kumar Logistics', email: 'kumar@email.com', phone: '+91 87654 32109',
        role: 'shipper', companyName: 'Kumar Logistics Pvt Ltd', gstNumber: '29AABCK5678L1Z2',
        rating: 4.2, verified: true, fleetSize: 8, totalLoads: 56, memberSince: '2024-06-20',
        city: 'Bangalore', avatar: null,
        reviews: [
            { by: 'Metro Freight', rating: 4, text: 'Consistent service quality.', date: '2026-02-10' },
        ]
    },
    {
        id: 'T003', name: 'Patel Express', email: 'patel@email.com', phone: '+91 76543 21098',
        role: 'shipper', companyName: 'Patel Express Solutions', gstNumber: '27AABCP9012M1Z3',
        rating: 4.8, verified: true, fleetSize: 25, totalLoads: 145, memberSince: '2023-11-10',
        city: 'Mumbai', avatar: null,
        reviews: [
            { by: 'Sharma Transport', rating: 5, text: 'Best transporter in the western region!', date: '2026-02-20' },
            { by: 'Gupta Movers', rating: 5, text: 'Excellent fleet and professional drivers.', date: '2026-01-28' },
        ]
    },
    {
        id: 'T004', name: 'Reddy Carriers', email: 'reddy@email.com', phone: '+91 65432 10987',
        role: 'transporter', companyName: 'Reddy & Sons Carriers', gstNumber: '36AABCR3456N1Z4',
        rating: 4.3, verified: true, fleetSize: 6, totalLoads: 34, memberSince: '2025-01-05',
        city: 'Hyderabad', avatar: null,
        reviews: [
            { by: 'Tech Logistics', rating: 4, text: 'Handles fragile cargo well.', date: '2026-02-05' },
        ]
    },
    {
        id: 'T005', name: 'Singh Transport', email: 'singh@email.com', phone: '+91 54321 09876',
        role: 'transporter', companyName: 'Singh Transport House', gstNumber: '19AABCS7890P1Z5',
        rating: 4.0, verified: false, fleetSize: 4, totalLoads: 22, memberSince: '2025-04-18',
        city: 'Kolkata', avatar: null, reviews: []
    },
    {
        id: 'T006', name: 'National Freight Lines', email: 'nfl@email.com', phone: '+91 43210 98765',
        role: 'transporter', companyName: 'National Freight Lines Ltd', gstNumber: '07AABCN1234Q1Z6',
        rating: 4.7, verified: true, fleetSize: 30, totalLoads: 210, memberSince: '2023-07-22',
        city: 'Delhi', avatar: null,
        reviews: [
            { by: 'MegaCorp', rating: 5, text: 'Top-notch service across all routes.', date: '2026-02-18' },
            { by: 'Sharma Transport', rating: 5, text: 'Fleet is always in great condition.', date: '2026-02-01' },
            { by: 'Kumar Logistics', rating: 4, text: 'Wide network coverage.', date: '2026-01-15' },
        ]
    },
    {
        id: 'T007', name: 'Gupta Movers', email: 'gupta@email.com', phone: '+91 32109 87654',
        role: 'shipper', companyName: 'Gupta Movers & Packers', gstNumber: '09AABCG5678R1Z7',
        rating: 3.8, verified: true, fleetSize: 3, totalLoads: 15, memberSince: '2025-08-10',
        city: 'Lucknow', avatar: null, reviews: []
    },
    {
        id: 'T008', name: 'Western Express', email: 'western@email.com', phone: '+91 21098 76543',
        role: 'transporter', companyName: 'Western Express Cargo', gstNumber: '24AABCW9012S1Z8',
        rating: 4.4, verified: true, fleetSize: 10, totalLoads: 67, memberSince: '2024-09-01',
        city: 'Surat', avatar: null,
        reviews: [
            { by: 'Textile Hub', rating: 4, text: 'Specializes in textile transport. Very good.', date: '2026-02-12' },
        ]
    },
    {
        id: 'T009', name: 'Metro Freight Corp', email: 'metro@email.com', phone: '+91 10987 65432',
        role: 'transporter', companyName: 'Metro Freight Corporation', gstNumber: '27AABCM3456T1Z9',
        rating: 4.6, verified: true, fleetSize: 18, totalLoads: 120, memberSince: '2024-01-15',
        city: 'Mumbai', avatar: null,
        reviews: [
            { by: 'Patel Express', rating: 5, text: 'Reliable partner for long-distance freight.', date: '2026-02-08' },
        ]
    },
    {
        id: 'T010', name: 'Southern Logistics', email: 'southern@email.com', phone: '+91 09876 54321',
        role: 'transporter', companyName: 'Southern Logistics Hub', gstNumber: '33AABCS7890U1Z0',
        rating: 4.1, verified: true, fleetSize: 7, totalLoads: 45, memberSince: '2024-11-20',
        city: 'Chennai', avatar: null, reviews: []
    },
    {
        id: 'T011', name: 'Gujarat Cargo', email: 'gcargo@email.com', phone: '+91 98700 12345',
        role: 'transporter', companyName: 'Gujarat Cargo Services', gstNumber: '24AABCG1234V1Z1',
        rating: 4.5, verified: true, fleetSize: 14, totalLoads: 98, memberSince: '2024-05-10',
        city: 'Ahmedabad', avatar: null,
        reviews: [
            { by: 'Western Express', rating: 5, text: 'Great coverage in Gujarat region.', date: '2026-01-30' },
        ]
    },
    {
        id: 'T012', name: 'AP Roadways', email: 'aproadways@email.com', phone: '+91 87600 23456',
        role: 'transporter', companyName: 'AP Roadways Pvt Ltd', gstNumber: '37AABCA5678W1Z2',
        rating: 4.0, verified: false, fleetSize: 5, totalLoads: 28, memberSince: '2025-02-28',
        city: 'Visakhapatnam', avatar: null, reviews: []
    },
];

export const bids = [
    { id: 'B001', load: 'L001', bidder: 'T006', amount: 42000, message: 'Can deliver in 3 days. Have a container ready in Delhi.', status: 'pending', createdAt: '2026-02-25T11:00:00' },
    { id: 'B002', load: 'L001', bidder: 'T009', amount: 44000, message: 'Express delivery available. Insured cargo.', status: 'pending', createdAt: '2026-02-25T11:30:00' },
    { id: 'B003', load: 'L002', bidder: 'T010', amount: 17000, message: 'Regular Bangalore-Chennai route. Can pick up tomorrow.', status: 'pending', createdAt: '2026-02-25T10:00:00' },
    { id: 'B004', load: 'L004', bidder: 'T006', amount: 20000, message: 'Temperature-controlled container available.', status: 'accepted', createdAt: '2026-02-24T19:00:00' },
    { id: 'B005', load: 'L005', bidder: 'T008', amount: 14000, message: 'Open body truck ready at Delhi depot.', status: 'accepted', createdAt: '2026-02-24T15:00:00' },
    { id: 'B006', load: 'L007', bidder: 'T011', amount: 36000, message: 'Certified for hazardous material transport.', status: 'pending', createdAt: '2026-02-24T10:00:00' },
    { id: 'B007', load: 'L009', bidder: 'T006', amount: 50000, message: 'Flatbed ready at Pune. Can load immediately.', status: 'pending', createdAt: '2026-02-23T13:00:00' },
    { id: 'B008', load: 'L009', bidder: 'T009', amount: 48000, message: 'Competitive rate for Pune-Nagpur route.', status: 'pending', createdAt: '2026-02-23T14:00:00' },
    { id: 'B009', load: 'L011', bidder: 'T008', amount: 7500, message: 'LCV available for short-haul.', status: 'accepted', createdAt: '2026-02-22T15:00:00' },
    { id: 'B010', load: 'L013', bidder: 'T006', amount: 62000, message: 'Trailer with crane for heavy machinery.', status: 'pending', createdAt: '2026-02-22T09:00:00' },
    { id: 'B011', load: 'L013', bidder: 'T009', amount: 60000, message: 'Special trailer available. Insured.', status: 'pending', createdAt: '2026-02-22T10:00:00' },
    { id: 'B012', load: 'L013', bidder: 'T012', amount: 58000, message: 'Budget option. 5-day delivery.', status: 'rejected', createdAt: '2026-02-22T11:00:00' },
    { id: 'B013', load: 'L015', bidder: 'T006', amount: 18000, message: 'Open body ready in Chandigarh.', status: 'pending', createdAt: '2026-02-21T11:00:00' },
    { id: 'B014', load: 'L017', bidder: 'T012', amount: 26000, message: 'Tipper available in Visakhapatnam.', status: 'pending', createdAt: '2026-02-20T15:00:00' },
    { id: 'B015', load: 'L019', bidder: 'T008', amount: 20000, message: 'Regular Jaipur-Ahmedabad route.', status: 'pending', createdAt: '2026-02-20T09:00:00' },
];

export const notifications = [
    { id: 'N001', type: 'bid', title: 'New Bid Received', message: 'National Freight Lines bid ₹42,000 on your Delhi → Mumbai load.', time: '10 min ago', read: false },
    { id: 'N002', type: 'bid', title: 'Bid Accepted!', message: 'Your bid of ₹20,000 on Hyderabad → Bangalore load was accepted.', time: '2 hours ago', read: false },
    { id: 'N003', type: 'load', title: 'New Load Available', message: 'A new 25 Ton Steel load posted on Pune → Nagpur route.', time: '5 hours ago', read: true },
    { id: 'N004', type: 'system', title: 'Profile Verified', message: 'Your GST verification is complete. You now have a verified badge!', time: '1 day ago', read: true },
    { id: 'N005', type: 'load', title: 'Load Updated', message: 'The Delhi → Jaipur textiles load has been assigned.', time: '1 day ago', read: true },
    { id: 'N006', type: 'bid', title: 'Bid Rejected', message: 'Your bid on Mumbai → Delhi machinery load was not accepted.', time: '3 days ago', read: true },
    { id: 'N007', type: 'system', title: 'Welcome to CargoConnect!', message: 'Complete your profile to start posting loads and bidding.', time: '5 days ago', read: true },
];

export const testimonials = [
    { name: 'Rajesh Sharma', company: 'Sharma Transport Co.', city: 'Delhi', text: 'CargoConnect has transformed how we find return loads. Our trucks rarely run empty now. Revenue increased by 40%!', rating: 5 },
    { name: 'Priya Kumar', company: 'Kumar Logistics', city: 'Bangalore', text: 'The bid system is fantastic. We get competitive rates and can choose the best transporter for each load.', rating: 5 },
    { name: 'Amit Patel', company: 'Patel Express', city: 'Mumbai', text: 'As a fleet owner, the dashboard analytics help me make better business decisions. Highly recommended!', rating: 4 },
    { name: 'Sanjay Reddy', company: 'Reddy Carriers', city: 'Hyderabad', text: 'Verified profiles give us confidence. We know who we are dealing with. Great platform for transporters.', rating: 5 },
    { name: 'Gurpreet Singh', company: 'Singh Transport', city: 'Kolkata', text: 'Simple to use even for someone not tech-savvy. Posted my first load in 2 minutes!', rating: 4 },
    { name: 'Meera Iyer', company: 'Southern Logistics', city: 'Chennai', text: 'The live tracking feature gives our clients peace of mind. Professional service all around.', rating: 5 },
];

export const popularRoutes = [
    { from: 'Delhi', to: 'Mumbai', loads: 156, distance: '1,400 km' },
    { from: 'Mumbai', to: 'Pune', loads: 124, distance: '150 km' },
    { from: 'Bangalore', to: 'Chennai', loads: 98, distance: '350 km' },
    { from: 'Delhi', to: 'Jaipur', loads: 87, distance: '280 km' },
    { from: 'Hyderabad', to: 'Bangalore', loads: 76, distance: '570 km' },
    { from: 'Kolkata', to: 'Patna', loads: 65, distance: '600 km' },
    { from: 'Ahmedabad', to: 'Mumbai', loads: 92, distance: '530 km' },
    { from: 'Chennai', to: 'Coimbatore', loads: 54, distance: '500 km' },
];

export const getLoadById = (id) => loads.find(l => l.id === id);
export const getTruckById = (id) => trucks.find(t => t.id === id);
export const getTransporterById = (id) => transporters.find(t => t.id === id);
export const getBidsForLoad = (loadId) => bids.filter(b => b.load === loadId);
export const getTrucksByOwner = (ownerId) => trucks.filter(t => t.owner === ownerId);
export const getLoadsByPoster = (posterId) => loads.filter(l => l.postedBy === posterId);
export const getTruckTypeLabel = (value) => truckTypes.find(t => t.value === value)?.label || value;
