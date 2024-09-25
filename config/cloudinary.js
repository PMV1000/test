import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;


// Configuration
cloudinary.config({ 
    cloud_name: 'dawq5t7hf', 
    api_key: '351246931981482', 
    api_secret: 'JgDbF40wt4CUOfMTjR_U2IfoPNI' // Click 'View API Keys' above to copy your API secret
})

export default cloudinary;