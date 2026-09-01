document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));

        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
    });
});

const contactForm = document.querySelector("#contact-form");
const whatsappButton = document.querySelector("#send-whatsapp");

function getFormMessage() {
    const data = new FormData(contactForm);
    const name = data.get("name");
    const email = data.get("email");
    const project = data.get("project");
    const message = data.get("message");

    return {
        name,
        email,
        project,
        body: `Name: ${name}\nEmail: ${email}\nProject type: ${project}\n\nMessage:\n${message}`,
    };
}

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
        return;
    }

    const formMessage = getFormMessage();
    const to = encodeURIComponent("clutch.jcs26@gmail.com");
    const subject = encodeURIComponent(`New project request from ${formMessage.name}`);
    const body = encodeURIComponent(formMessage.body);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;

    window.open(gmailUrl, "_blank", "noopener");
});

whatsappButton.addEventListener("click", () => {
    if (!contactForm.reportValidity()) {
        return;
    }

    const formMessage = getFormMessage();
    const text = encodeURIComponent(`New project request\n\n${formMessage.body}`);

    window.open(`https://wa.me/244959863822?text=${text}`, "_blank", "noopener");
});
