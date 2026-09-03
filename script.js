// ============================================================
// GROW MATE — MAIN JAVASCRIPT
// ============================================================


// ------------------------------------------------------------
// SUPABASE CONFIGURATION
// ------------------------------------------------------------

const SUPABASE_URL =
  "https://ftukdnfklkhpmlvdfphj.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_Tm7yIAQyPuN35j7za2i9AQ_FHDASoDw";

const LEADS_URL =
  `${SUPABASE_URL}/rest/v1/leads`;


// ------------------------------------------------------------
// PAGE READY
// ------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {


  // ----------------------------------------------------------
  // CURRENT YEAR
  // ----------------------------------------------------------

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // ----------------------------------------------------------
  // SMOOTH NAVIGATION
  // ----------------------------------------------------------

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


  // ----------------------------------------------------------
  // NAVBAR SCROLL EFFECT
  // ----------------------------------------------------------

  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

      navbar.style.background = "rgba(8,9,11,.92)";

    } else {

      navbar.style.background = "rgba(8,9,11,.72)";

    }

  });


  // ----------------------------------------------------------
  // CONTACT FORM
  // ----------------------------------------------------------

  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");


  if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

      event.preventDefault();


      const submitButton =
        contactForm.querySelector(".form-submit");


      // Get form values
      const name =
        document.getElementById("name").value.trim();

      const email =
        document.getElementById("email").value.trim();

      const phone =
        document.getElementById("phone").value.trim();

      const service =
        document.getElementById("service").value;

      const message =
        document.getElementById("message").value.trim();


      // Basic validation
      if (!name || !message) {

        formMessage.textContent =
          "Please enter your name and project details.";

        return;
      }


      // Loading state
      submitButton.disabled = true;
      submitButton.innerHTML = "Sending...";


      formMessage.textContent = "";


      try {

        // Send data to Supabase
        const response = await fetch(LEADS_URL, {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

            "apikey": SUPABASE_KEY,

            "Authorization": `Bearer ${SUPABASE_KEY}`,

            "Prefer": "return=minimal"

          },

          body: JSON.stringify({

            name: name,
            email: email || null,
            phone: phone || null,
            service: service || null,
            message: message

          })

        });


        // Check response
        if (!response.ok) {

          const errorText = await response.text();

          console.error("Supabase error:", errorText);

          throw new Error("Submission failed");

        }


        // Success
        formMessage.textContent =
          "✓ Your project request has been sent successfully!";

        contactForm.reset();


      } catch (error) {

        console.error(error);

        formMessage.textContent =
          "Something went wrong. Please try WhatsApp or email.";


      } finally {

        submitButton.disabled = false;

        submitButton.innerHTML =
          'Send Project Request <span>↗</span>';

      }

    });

  }

});