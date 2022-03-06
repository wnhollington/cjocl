import * as React from "react"
import SignupForm from '../components/signupForm'

const SignupModal = () => {
  return (
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <h5 class="modal-title text-center mb-2" id="staticBackdropLabel">Newsletter Signup</h5>
            <p>Signup for our newsletter to receive the in time updates when additional content and articles are published.</p>
          </div>
          <div class="modal-body">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupModal