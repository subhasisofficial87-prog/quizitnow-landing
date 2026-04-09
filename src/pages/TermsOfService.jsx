import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import '../styles/legal.css'

function TermsOfService() {
  const navigate = useNavigate()

  return (
    <div className="legal-page-wrapper">
      <div className="legal-header">
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <h1>Terms of Service</h1>
      </div>
      <div className="legal-container">
        <div className="legal-content">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using QuizItNow.com (the "Service"), you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to abide by the above, please do not use this Service.
            </p>
          </section>

          <section>
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on
              QuizItNow.com for personal, non-commercial transitory viewing only. This is the grant of a license,
              not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
              <li>Attempting to decompile or reverse engineer any software contained on the Service</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              <li>Using automated tools to access, download, or monitor the Service</li>
              <li>Engaging in any form of harassment or abuse of other users</li>
              <li>Submitting false or misleading information</li>
            </ul>
          </section>

          <section>
            <h2>3. Disclaimer</h2>
            <p>
              The materials on QuizItNow.com are provided on an 'as is' basis. QuizItNow.com makes no warranties,
              expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
              of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2>4. Limitations</h2>
            <p>
              In no event shall QuizItNow.com or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use the materials on QuizItNow.com, even if QuizItNow.com or an authorized representative has been
              notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2>5. Accuracy of Materials</h2>
            <p>
              The materials appearing on QuizItNow.com could include technical, typographical, or photographic errors.
              QuizItNow.com does not warrant that any of the materials on its Service are accurate, complete, or current.
              QuizItNow.com may make changes to the materials contained on its Service at any time without notice. However,
              QuizItNow.com does not commit to updating the materials.
            </p>
          </section>

          <section>
            <h2>6. Links</h2>
            <p>
              QuizItNow.com has not reviewed all of the sites linked to its Service and is not responsible for the
              contents of any such linked site. The inclusion of any link does not imply endorsement by QuizItNow.com of
              the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2>7. Modifications</h2>
            <p>
              QuizItNow.com may revise these terms of service for its Service at any time without notice. By using this
              Service, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2>8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction
              in which QuizItNow.com operates, and you irrevocably submit to the exclusive jurisdiction of the courts
              located in that location.
            </p>
          </section>

          <section>
            <h2>9. User-Generated Content</h2>
            <p>
              Any content you submit, post, or display on QuizItNow.com remains your intellectual property. However, by
              submitting such content, you grant QuizItNow.com a non-exclusive, royalty-free, perpetual, and worldwide
              license to use, reproduce, modify, and distribute such content.
            </p>
          </section>

          <section>
            <h2>10. Prohibited Activities</h2>
            <p>
              Users agree not to engage in any of the following prohibited activities:
            </p>
            <ul>
              <li>Violating any laws, rules, or regulations</li>
              <li>Infringing upon any intellectual property rights of others</li>
              <li>Harassing, abusing, threatening, or otherwise violating the legal rights of others</li>
              <li>Posting hateful, abusive, or discriminatory content</li>
              <li>Spamming or sending unsolicited communications</li>
              <li>Attempting to gain unauthorized access to the Service</li>
              <li>Using the Service for commercial purposes without authorization</li>
            </ul>
          </section>

          <section>
            <h2>11. Account Termination</h2>
            <p>
              QuizItNow.com reserves the right to terminate or suspend any user account and deny access to the Service
              at any time, for any reason, at its sole discretion, with or without notice.
            </p>
          </section>

          <section>
            <h2>12. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
              <br />
              <strong>Email:</strong> hello@quizitnow.com
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

export default TermsOfService
