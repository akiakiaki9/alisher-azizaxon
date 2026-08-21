export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content animate-fade-in-up delay-8">
                <div className="footer-divider" />
                <p className="footer-text">
                    Разработано с <span className="footer-heart">♥</span> в{' '}
                    <a
                        href="https://www.akbarsoft.uz"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Akbar Soft
                    </a>
                    <br />
                    <span style={{ fontSize: '10px', opacity: '0.5' }}>
                        © 2026 Все права защищены
                    </span>
                </p>
            </div>
        </footer>
    );
}