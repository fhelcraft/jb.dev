function Experience() {
    const jobs = [
        {
            role: "Web App Developer | Information System Analyst II",
            org: "City College of Cagayan de Oro",
            period: "February 2024 – Present",
            points: [
                "Maintained 99% system uptime for institutional web applications and services.",
                "Developed and deployed multiple institutional systems: City College of Cagayan de Oro website, SmartChive document repository, Attendium attendance system, Courseware LMS platform.",
                "Implemented AI chatbot automation, handling up to 100% of common user inquiries.",
                "Reduced manual reporting workload by approximately 40% using system and automation.",
                "Deployed AI chatbot on the website, providing 100% automated responses.",
                "Provided technical support for system and network issues, including troubleshooting and maintenance, ensuring 99% operational uptime for institutional systems, network connectivity, and printer services.",
            ],
        },
        {
            role: "System Administrator | Systems AI Solution",
            org: "Skunkworks PH",
            period: "August 2023 – February 2024",
            points: [
                "Managed and maintained system infrastructure, ensuring stable operation, security, and optimal performance of servers and network services.",
                "Monitored system health and logs, performed troubleshooting and issue resolution to minimize downtime and maintain service availability.",
                "Conducted system updates, patch management, and maintenance to improve infrastructure reliability and operational efficiency.",
                "Performed system testing and validation of AI camera solutions, ensuring accurate deployment, functionality, and integration within the network environment.",
            ],
        },
        {
            role: "Network Specialist / IT Support",
            org: "City College of Cagayan de Oro",
            period: "October 2022 – August 2023",
            points: [
                "Installed access points with multi-WAN configuration, achieving 95% building connectivity and seamless network performance.",
                "Designed and implemented the college's network infrastructure, deploying 100% of planned configurations across multiple buildings.",
                "Maintained network operations, proactively resolving issues and ensuring >95% uptime, catering to and resolving 95% of daily tickets.",
                "Supported faculty and staff with technical guidance, improving IT adoption and operational efficiency.",
            ],
        },
    ];

    return (
        <section id="experience" className="portfolio-section">
            <div className="portfolio-container">
                <h2 className="portfolio-section__title">Experience</h2>
                <div className="portfolio-timeline">
                    {jobs.map((job, i) => (
                        <article key={i} className="portfolio-timeline__item">
                            <div className="portfolio-timeline__header">
                                <h3>{job.role}</h3>
                                <p className="portfolio-timeline__org">
                                    {job.org}
                                </p>
                                <p className="portfolio-timeline__period">
                                    {job.period}
                                </p>
                            </div>
                            <ul className="portfolio-timeline__points">
                                {job.points.map((point, j) => (
                                    <li key={j}>{point}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Experience;
