import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import '../styles/legal.css'

function PrivacyPolicy() {
  const navigate = useNavigate()

  return (
    <div className="legal-page-wrapper">
      <div className="legal-header">
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <h1>Privacy Policy</h1>
      </div>
      <div className="legal-container">
        <div className="legal-content">
          <section>
            <h2>1. Introduction</h2>
            <p>
              QuizItNow.com ("we," "us," "our," or "Company") respects the privacy of its users ("user" or "you").
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit
              our website and use our quiz and game services.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the Service includes:</p>

            <h3>Personal Data:</h3>
            <ul>
              <li><strong>Email Address:</strong> If you choose to contact us or subscribe to updates</li>
              <li><strong>Name:</strong> For personalization and communication purposes</li>
              <li><strong>Demographic Information:</strong> Such as age, interests, and preferences</li>
              <li><strong>User-Generated Content:</strong> Quiz answers, game scores, and any content you submit</li>
            </ul>

            <h3>Automatic Data Collection:</h3>
            <ul>
              <li><strong>Log Files:</strong> IP address, browser type, Internet Service Provider (ISP), date/time stamps</li>
              <li><strong>Cookies and Tracking:</strong> To enhance user experience and analyze usage patterns</li>
              <li><strong>Device Information:</strong> Device type, operating system, and unique device identifiers</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked, and interactions</li>
            </ul>
          </section>

          <section>
            <h2>3. Use of Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:</p>
            <ul>
              <li>Create and manage your account</li>
              <li>Process your quiz submissions and calculate scores</li>
              <li>Improve the Service and develop new features</li>
              <li>Send periodic emails regarding your account or quiz results</li>
              <li>Fulfill and send you information related to your inquiry</li>
              <li>Analyze usage trends to improve user experience</li>
              <li>Prevent fraudulent transactions and other illegal activities</li>
              <li>Personalize your experience on the Service</li>
              <li>Generate aggregated statistical data</li>
            </ul>
          </section>

          <section>
            <h2>4. Disclosure of Your Information</h2>
            <p>We may share your information in the following situations:</p>
            <ul>
              <li><strong>Service Providers:</strong> We may share your information with third-party service providers who assist in operating our website and conducting our business</li>
              <li><strong>Business Transfers:</strong> Your information may be disclosed if QuizItNow.com is involved in a merger, acquisition, or asset sale</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information when required by law or to protect our rights, privacy, safety, or property</li>
              <li><strong>Aggregated Data:</strong> We may share aggregated, de-identified information that cannot reasonably be used to identify you</li>
            </ul>
          </section>

          <section>
            <h2>5. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to protect your personal information.
              However, no method of transmission over the Internet or electronic storage is completely secure. While we
              strive to use commercially acceptable means to protect your personal information, we cannot guarantee its
              absolute security.
            </p>
          </section>

          <section>
            <h2>6. Cookies</h2>
            <p>
              The Service may use "cookies" to enhance your experience. Your browser places cookies on your hard drive
              for record-keeping purposes. You may choose to disable cookies through your browser settings. However, this
              may affect the functionality of the Service. We use cookies to:
            </p>
            <ul>
              <li>Understand and save your preferences for future visits</li>
              <li>Keep track of advertisements and compile aggregate data about site traffic and interactions</li>
              <li>Monitor the effectiveness of marketing campaigns</li>
              <li>Store your theme preferences (dark/light mode)</li>
            </ul>
          </section>

          <section>
            <h2>7. Third-Party Links</h2>
            <p>
              The Service may contain links to external websites and embedded third-party applications (such as game
              providers). We are not responsible for the privacy practices of these external sites. Please review their
              privacy policies before providing any personal information.
            </p>
          </section>

          <section>
            <h2>8. Children's Privacy</h2>
            <p>
              QuizItNow.com does not knowingly collect personal information from children under the age of 13. If we
              become aware that a child under 13 has provided us with personal information, we will take steps to delete
              such information and terminate the child's account. If you are a parent or guardian and believe your child
              has provided information to us, please contact us immediately.
            </p>
          </section>

          <section>
            <h2>9. Your Privacy Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul>
              <li><strong>Access:</strong> The right to access your personal data</li>
              <li><strong>Correction:</strong> The right to correct inaccurate personal data</li>
              <li><strong>Deletion:</strong> The right to request deletion of your personal data</li>
              <li><strong>Opt-Out:</strong> The right to opt-out of marketing communications</li>
              <li><strong>Data Portability:</strong> The right to receive your data in a portable format</li>
            </ul>
            <p>To exercise these rights, please contact us at hello@quizitnow.com.</p>
          </section>

          <section>
            <h2>10. CCPA Compliance</h2>
            <p>
              If you are a California resident, you have the right to know what personal information is collected,
              used, and shared. For more information regarding your California privacy rights, please contact us.
            </p>
          </section>

          <section>
            <h2>11. GDPR Compliance</h2>
            <p>
              If you are located in the European Union, the United Kingdom, or other jurisdictions with similar privacy
              laws, we comply with the General Data Protection Regulation (GDPR). We only process personal data where we
              have a lawful basis to do so, such as your explicit consent.
            </p>
          </section>

          <section>
            <h2>12. Do Not Track</h2>
            <p>
              Some browsers include a "Do Not Track" feature. Currently, our Service does not respond to Do Not Track
              signals. If we do so in the future, we will describe how we respond to such signals in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2>13. Contact Us Regarding Privacy</h2>
            <p>
              If you have questions or comments about this Privacy Policy, or if you wish to exercise your privacy rights,
              please contact us at:
              <br />
              <strong>Email:</strong> hello@quizitnow.com
            </p>
          </section>

          <section>
            <h2>14. Changes to Privacy Policy</h2>
            <p>
              We reserve the right to modify this Privacy Policy at any time. Changes will be effective immediately upon
              posting to the Service. Your continued use of the Service following the posting of revised Privacy Policy
              means that you accept and agree to the changes.
            </p>
          </section>

          <section className="last-updated">
            <p><em>Last updated: April 2026</em></p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
