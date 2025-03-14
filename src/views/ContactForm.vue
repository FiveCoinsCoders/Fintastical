<template>
  <div class="contact-container">
    <h1>Contact Us</h1>
    <p>
      If you have any questions or need us to help you with a specific topic, do not hesitate to contact us through the following form.
    </p>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="form.name" placeholder="Enter your name" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" placeholder="Enter your email" required />
      </div>

      <div class="form-group">
        <label for="subject">Subject</label>
        <input type="text" id="subject" v-model="form.subject" placeholder="Enter the subject" required />
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" v-model="form.message" required></textarea>
      </div>

      <!-- File Upload -->
      <div class="form-group">
        <label for="file-upload">Upload a Contact File</label>
        <input type="file" @change="handleFileUpload" id="file-upload" />
      </div>

      <button type="submit" class="submit-btn">Submit</button>
    </form>

    <!-- Display File Content -->
    <div v-if="fileContent" class="file-content">
      <h2>File Content:</h2>
      <pre>{{ fileContent }}</pre>
    </div>

    <!-- Success Message -->
    <div v-if="formSubmitted" class="success-message">
      Thank you for reaching out! We will get back to you soon.
    </div>

    <!-- Pop-up de confirmación -->
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-content">
        <p>We have received your details and will contact you shortly. Thank you for your patience.</p>
        <button @click="closePopup">Close</button>
      </div>
    </div>
  </div>
  
  <!-- Google Map -->
  <iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9921.580742178235!2d-0.10874529083371688!3d51.51766570000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b1f29d917ad%3A0xf3fa0498c14db63c!2s456%20Business%20Ave%2C%20London%2C%20UK%20EC1A%201BB!5e0!3m2!1sen!2sin!4v1678208291173!5m2!1sen!2sin"
width="600"
height="450"
class="map-container"
style="border:0;"
allowfullscreen=""
loading="lazy">
</iframe>

<!-- Our Offices Section (Separate from Contact Form) -->
  <div class="our-offices">
    <h1>Our Offices</h1>
    <p>Visit us at one of our locations worldwide.</p>
    <div class="office-list">
      <div class="office">
        <h3>New York Office</h3>
        <p>123 Financial Street, New York, NY 10001</p>
        <p>Phone: +1 (555) 123-4567</p>
      </div>
      <div class="office">
        <h3>London Office</h3>
        <p>456 Business Avenue, London, UK EC1A 1BB</p>
        <p>Phone: +44 (0)20 7946 0958</p>
      </div>
      <div class="office">
        <h3>Tokyo Office</h3>
        <p>789 Innovation Road, Tokyo, Japan 100-0001</p>
        <p>Phone: +81 (0)3 1234 5678</p>
      </div>
    </div>
  </div>


</template>

<script setup>
import { ref, onMounted } from 'vue';

// Reactive variables using ref
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});
const fileContent = ref(null); // Stores the content of the uploaded file
const formSubmitted = ref(false); // Tracks if the form has been submitted
const showPopup = ref(false); // Controls visibility of the popup

// handleSubmit function
const handleSubmit = async () => {
  console.log('Form Submitted:', form.value);
  formSubmitted.value = true;
  showPopup.value = true; // Show the popup

  // Prepare the form data for submission
  const data = { ...form.value };

  try {
    const response = await fetch("http://localhost:3000/contactos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Respuesta del servidor:", result);

    if (response.ok) {

      form.value = { name: '', email: '', subject: '', message: '' }; // Reset form fields
    } else {
      alert("Error al enviar el mensaje");
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    alert("Error de conexión con el servidor");
  }
};

// handleFileUpload function
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.type === 'text/plain') {
    const reader = new FileReader();
    reader.onload = () => {
      fileContent.value = reader.result; // Store file content
    };
    reader.readAsText(file); // Read the file as text
  } else {
    alert('Only text files are allowed.'); // Show an alert if the file is not text
  }
};


// closePopup function
const closePopup = () => {
  showPopup.value = false;
  fileContent.value = null;
};

const loadGoogleMaps = () => {
  if (window.google && window.google.maps) {
    initMap(); // Initialize map if API is already loaded
    return;
  }
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
  script.async = true;
  script.defer = true;
  script.onload = () => {
    initMap(); // Initialize map once the script is loaded
  };
  document.head.appendChild(script); // Append the script to the document head
}

const initMap = () => {
  const mapElement = document.getElementById('map');
  if (mapElement) {
    const map = new window.google.maps.Map(mapElement, {
      center: { lat: 40.7128, lng: -74.0060 }, // Coordinates for map center (New York)
      zoom: 12, // Set zoom level
    });
    new window.google.maps.Marker({
      position: { lat: 40.7128, lng: -74.0060 }, // Position of the marker
      map: map, // Attach the marker to the map
      title: 'Our Location', // Tooltip that appears when hovering over the marker
    });
  }
};

// onMounted lifecycle hook to load Google Maps when the component is mounted
onMounted(() => {
  loadGoogleMaps(); // Call the function to load the Google Maps script
});

</script>


<style scoped>

.contact-container {
  width: 100%;
  max-width: 600px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  margin-left: 30rem;
  margin-top: 2rem;
}

h1 {
  text-align: center;
  color: #333;
  font-weight: bold;
}

p {
  text-align: center;
  color: black;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
textarea {
  width: 550px;
  padding: 10px;
  border: 1px solid #070707;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 16px;
}

textarea {
  min-height: 120px;
}

button.submit-btn {
  width: 100%;
  padding: 12px;
  color: white;
  background-color:#6046B0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.submit-btn:hover {
  background-color:#8F6AFF;;
}

.file-content {
  margin: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.success-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #e6ffe6;
  color: #4caf50;
  text-align: center;
  border-radius: 4px;
}

.map-wrapper {
  display: flex;
  flex-direction: row; 
  justify-content: space-between;
  gap: 20px;
}

.map-container { 
  max-width: 600px;
  height:500px; 
  margin-left: 100rem;
  width: 70%; 
  border-radius: 12px; 
  background-color: #f0f0f0;
  padding: 15px; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); 
  position: relative;
  top: -600px; 
  display: flex;
  justify-content: center;
  align-items: center;
}



/* Estilos para el pop-up */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 300px;
}

.popup-content p {
  margin-bottom: 20px;
  font-size: 1.1rem;
  color: #333;
}

.popup-content button {
  background-color: #6046B0;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.popup-content button:hover {
  background-color: #8F6AFF;
}

/* Office Section Styling */

.our-offices {
  max-width: 1200px; 
  margin: 20px auto; 
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Office List - Display in a Single Row */
.office-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; 
  gap: 15px; 
  margin-top: 10px; 
}

/* Individual Office */
.office {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 30%;
  min-width: 250px; 
  text-align: center;
}

/* Office Title */
.office h3 {
  color: #6046B0;
  font-size: 30px; 
  margin-bottom: 8px;
}

/* Office Text */
.office p {
  color: #333;
  font-size: 18px;
  margin: 5px 0;
}

.our-offices {
  margin-top: -400px; /* Adjust this value */
}


@media (max-width: 1024px) {
  .office-list {
    flex-direction: row;
  }
}

@media (max-width: 900px) {
  .office-list {
    flex-direction: row;
  }
  .office {
    width: 90%;
  }
}

@media (max-width: 768px) {
  .office-list {
    flex-direction: column;
  }
  .our-offices {
    width: 85%;
  }
  .office {
    width: 95%;
  }
}

/* 📌 RESPONSIVE: Stack on Smaller Screens */
@media (max-width: 900px) {
  .map-wrapper {
    display: flex;
    flex-direction: column; /* Stack items vertically */
  }

  .contact-container {
    width: 90%;
    margin: 0 auto; 
  }

  .map-container {
    width: 90%;
    height: 400px;
    margin: 0 auto; 
  }

  .our-offices {
    width: 90%;
    margin: 20px auto;
  }
}

/* 📌 EVEN SMALLER SCREENS */
@media (max-width: 600px) {
  .map-container {
    height: 300px;
  }

  .contact-container,
  .map-container,
  .our-offices {
    width: 95%;
  }
}



</style>
