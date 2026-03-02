import User from './models/User.js';
import Load from './models/Load.js';
import Truck from './models/Truck.js';
import Bid from './models/Bid.js';

const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'];
const truckTypes = ['open_body', 'container', 'trailer', 'flatbed', 'tanker', 'lcv', 'hcv', 'tipper'];
const materials = ['Electronics', 'FMCG', 'Textiles', 'Machinery', 'Chemicals', 'Building Materials', 'Furniture', 'Food Grains', 'Pharmaceuticals', 'Steel & Iron'];

const seedDB = async () => {
    // Check if already seeded
    const userCount = await User.countDocuments();
    if (userCount > 0) {
        console.log('📦 Database already has data, skipping seed');
        return;
    }

    console.log('🌱 Seeding database...');

    // Create users
    const users = await User.create([
        { name: 'Sharma Transport Co.', email: 'sharma@email.com', password: 'password123', phone: '+91 98765 43210', role: 'shipper', companyName: 'Sharma Transport Co.', gstNumber: '07AABCS1429B1Z1', city: 'Delhi', rating: 4.5, verified: true, fleetSize: 12, totalLoads: 89, reviews: [{ by: 'Patel Logistics', rating: 5, text: 'Very reliable and punctual delivery.' }] },
        { name: 'Kumar Logistics', email: 'kumar@email.com', password: 'password123', phone: '+91 87654 32109', role: 'shipper', companyName: 'Kumar Logistics', gstNumber: '29AABCK5678L1Z2', city: 'Bangalore', rating: 4.2, verified: true, fleetSize: 8, totalLoads: 56 },
        { name: 'Patel Express', email: 'patel@email.com', password: 'password123', phone: '+91 76543 21098', role: 'shipper', companyName: 'Patel Express Solutions', gstNumber: '27AABCP9012M1Z3', city: 'Mumbai', rating: 4.8, verified: true, fleetSize: 25, totalLoads: 145, reviews: [{ by: 'Sharma Transport', rating: 5, text: 'Best transporter in the western region!' }] },
        { name: 'National Freight Lines', email: 'nfl@email.com', password: 'password123', phone: '+91 43210 98765', role: 'transporter', companyName: 'National Freight Lines Ltd', gstNumber: '07AABCN1234Q1Z6', city: 'Delhi', rating: 4.7, verified: true, fleetSize: 30, totalLoads: 210, reviews: [{ by: 'MegaCorp', rating: 5, text: 'Top-notch service.' }, { by: 'Kumar Logistics', rating: 4, text: 'Wide network coverage.' }] },
        { name: 'Western Express', email: 'western@email.com', password: 'password123', phone: '+91 21098 76543', role: 'transporter', companyName: 'Western Express Cargo', gstNumber: '24AABCW9012S1Z8', city: 'Surat', rating: 4.4, verified: true, fleetSize: 10, totalLoads: 67 },
        { name: 'Vicky (Demo User)', email: 'vicky@email.com', password: 'password123', phone: '+91 99999 00000', role: 'shipper', companyName: 'Vicky Enterprises', city: 'Delhi', rating: 4.0, verified: true, fleetSize: 3, totalLoads: 10 },
    ]);

    // Create loads
    const loadData = [
        { postedBy: users[0]._id, from: 'Delhi', to: 'Mumbai', material: 'Electronics', weight: 12, truckType: 'container', price: 45000, pickupTime: new Date('2026-02-28T08:00:00'), description: 'LCD TVs and monitors. Fragile cargo.', status: 'open' },
        { postedBy: users[1]._id, from: 'Bangalore', to: 'Chennai', material: 'FMCG', weight: 8, truckType: 'container', price: 18000, pickupTime: new Date('2026-02-27T06:00:00'), description: 'Packaged food items for retail.', status: 'open' },
        { postedBy: users[2]._id, from: 'Mumbai', to: 'Pune', material: 'Furniture', weight: 6, truckType: 'open_body', price: 12000, pickupTime: new Date('2026-03-01T10:00:00'), description: 'Office furniture.', status: 'open' },
        { postedBy: users[0]._id, from: 'Hyderabad', to: 'Bangalore', material: 'Pharmaceuticals', weight: 4, truckType: 'container', price: 22000, pickupTime: new Date('2026-02-27T14:00:00'), description: 'Temperature-sensitive medicines.', status: 'open' },
        { postedBy: users[0]._id, from: 'Delhi', to: 'Jaipur', material: 'Textiles', weight: 10, truckType: 'open_body', price: 15000, pickupTime: new Date('2026-02-26T07:00:00'), description: 'Fabric rolls.', status: 'assigned' },
        { postedBy: users[5]._id, from: 'Kolkata', to: 'Delhi', material: 'Food Grains', weight: 20, truckType: 'trailer', price: 35000, pickupTime: new Date('2026-03-02T05:00:00'), description: 'Rice and wheat bags.', status: 'open' },
        { postedBy: users[3]._id, from: 'Ahmedabad', to: 'Mumbai', material: 'Chemicals', weight: 15, truckType: 'tanker', price: 38000, pickupTime: new Date('2026-03-01T09:00:00'), description: 'Industrial chemicals.', status: 'open' },
        { postedBy: users[1]._id, from: 'Chennai', to: 'Hyderabad', material: 'Automobile Parts', weight: 7, truckType: 'container', price: 16000, pickupTime: new Date('2026-02-28T11:00:00'), description: 'Engine components.', status: 'open' },
        { postedBy: users[2]._id, from: 'Pune', to: 'Delhi', material: 'Steel & Iron', weight: 25, truckType: 'flatbed', price: 52000, pickupTime: new Date('2026-03-03T06:00:00'), description: 'Steel rods.', status: 'open' },
        { postedBy: users[5]._id, from: 'Mumbai', to: 'Bangalore', material: 'Machinery', weight: 22, truckType: 'trailer', price: 65000, pickupTime: new Date('2026-03-04T08:00:00'), description: 'Industrial CNC machine.', status: 'open' },
    ];
    const loads = await Load.create(loadData);

    // Create trucks
    const truckData = [
        { owner: users[3]._id, type: 'container', make: 'Tata Motors', model: 'Tata 407', registrationNo: 'DL-01-AB-1234', capacity: 12, currentCity: 'Delhi', availableRoutes: ['Delhi-Mumbai', 'Delhi-Jaipur'], isAvailable: true, rating: 4.5, tripsCompleted: 234 },
        { owner: users[3]._id, type: 'open_body', make: 'Ashok Leyland', model: 'Ecomet 1215', registrationNo: 'MH-04-CD-5678', capacity: 15, currentCity: 'Mumbai', availableRoutes: ['Mumbai-Pune', 'Mumbai-Ahmedabad'], isAvailable: true, rating: 4.2, tripsCompleted: 189 },
        { owner: users[4]._id, type: 'trailer', make: 'Bharat Benz', model: '5028T', registrationNo: 'KA-01-EF-9012', capacity: 28, currentCity: 'Bangalore', availableRoutes: ['Bangalore-Chennai', 'Bangalore-Hyderabad'], isAvailable: true, rating: 4.8, tripsCompleted: 312 },
        { owner: users[3]._id, type: 'hcv', make: 'Ashok Leyland', model: 'Captain 2523', registrationNo: 'TS-08-MN-6789', capacity: 23, currentCity: 'Hyderabad', availableRoutes: ['Hyderabad-Bangalore'], isAvailable: true, rating: 4.7, tripsCompleted: 278 },
        { owner: users[4]._id, type: 'tanker', make: 'Tata Motors', model: 'Signa 4825', registrationNo: 'GJ-05-IJ-7890', capacity: 24, currentCity: 'Ahmedabad', availableRoutes: ['Ahmedabad-Mumbai'], isAvailable: true, rating: 4.6, tripsCompleted: 156 },
        { owner: users[5]._id, type: 'lcv', make: 'Mahindra', model: 'Bolero Pikup', registrationNo: 'TN-09-GH-3456', capacity: 3, currentCity: 'Chennai', availableRoutes: ['Chennai-Bangalore'], isAvailable: true, rating: 4.0, tripsCompleted: 87 },
    ];
    await Truck.create(truckData);

    // Create some bids
    await Bid.create([
        { load: loads[0]._id, bidder: users[3]._id, amount: 42000, message: 'Container ready in Delhi. 3-day delivery.', status: 'pending' },
        { load: loads[0]._id, bidder: users[4]._id, amount: 44000, message: 'Express delivery available.', status: 'pending' },
        { load: loads[1]._id, bidder: users[3]._id, amount: 17000, message: 'Regular Bangalore-Chennai route.', status: 'pending' },
        { load: loads[3]._id, bidder: users[3]._id, amount: 20000, message: 'Temperature-controlled container available.', status: 'accepted' },
        { load: loads[8]._id, bidder: users[3]._id, amount: 50000, message: 'Flatbed ready at Pune.', status: 'pending' },
    ]);

    console.log('✅ Database seeded successfully!');
    console.log(`   ${users.length} users, ${loads.length} loads, ${truckData.length} trucks, 5 bids`);
    console.log('   Demo login: vicky@email.com / password123');
};

export default seedDB;
