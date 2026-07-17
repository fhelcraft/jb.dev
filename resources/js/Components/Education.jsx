function Education() {
    return (
        <section id="education" className="portfolio-section">
            <div className="portfolio-container">
                {/* Education (hidden)
                <h2 className="portfolio-section__title">Education</h2>
                <div className="portfolio-education">
                    <p className="portfolio-education__org">
                        University of Science and Technology In Southern
                        Philippines
                    </p>
                    <p className="portfolio-education__course">
                        Bachelor of Science in Information Technology – June
                        2018 – August 2022
                    </p>
                    <ul className="portfolio-education__list">
                        <li>
                            Capstone: Barangay Appointment Scheduler System with
                            QR Code Scanner for user.
                        </li>
                        <li>1st Honor Dean&apos;s Lister (2022) 4th Year</li>
                        <li>2nd Honor Dean&apos;s Lister (2021) 3rd Year</li>
                    </ul>
                    <p className="portfolio-education__org">
                        Golden Heritage Institute
                    </p>
                    <p className="portfolio-education__course">
                        Professional Education Units (18 Units) – June 2025 –
                        November 2025
                    </p>
                </div>
                */}
                <div className="portfolio-awards">
                    <h3>Certifications</h3>
                    <ul className="portfolio-awards__list">
                        <li>CISCO: Cyber OPS Associate</li>
                        <li>Intro to Networks and Intro to IoT</li>
                    </ul>
                </div>
                <div className="portfolio-awards">
                    <h3>Awards</h3>
                    <p className="portfolio-awards__org">
                        City College of Cagayan de Oro:
                    </p>
                    <ul className="portfolio-awards__list">
                        <li>Top 1 Administrative Employee (2025)</li>
                        <li>Top 2 Job Order Employee (2024)</li>
                        <li>Top 1 Employee (2023)</li>
                    </ul>
                </div>
                <div className="portfolio-languages">
                    <h3>Languages</h3>
                    <p>English · Filipino</p>
                </div>
            </div>
        </section>
    );
}

export default Education;
