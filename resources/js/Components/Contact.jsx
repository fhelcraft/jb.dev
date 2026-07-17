function Contact() {
    return (
        <section id="contact" className="portfolio-section portfolio-section--contact">
            <div className="portfolio-container">
                <h2 className="portfolio-section__title">Contact</h2>
                <p className="portfolio-contact__lead">Let’s work together.</p>
                <div className="portfolio-contact__items">
                    <a href="mailto:jaybheedahay@gmail.com" className="portfolio-contact__item">
                        <span className="portfolio-contact__label">Email</span>
                        <span className="portfolio-contact__value">jaybheedahay@gmail.com
                        </span>
                    </a>
                    <a href="https://fhel-dev.vercel.app" target="_blank" rel="noopener noreferrer" className="portfolio-contact__item">
                        <span className="portfolio-contact__label">Portfolio</span>
                        <span className="portfolio-contact__value">jb-dev.vercel.app</span>
                    </a>
                    <a href="tel:+639104180743" className="portfolio-contact__item">
                        <span className="portfolio-contact__label">Phone</span>
                        <span className="portfolio-contact__value">+63 966 6675 127</span>
                    </a>
                    <div className="portfolio-contact__item">
                        <span className="portfolio-contact__label">Location</span>
                        <span className="portfolio-contact__value">Cagayan de Oro, Philippines</span>
                    </div>
                </div>
            </div>
            {/* item */}
        </section>
    );
}

export default Contact;
