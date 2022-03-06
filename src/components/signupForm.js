import * as React from "react"

const SignupForm = () => {
  return (
    <form>
      <div class="row">
        
        <div class="col-xs-6 col-sm-6 col-md-6 mb-4">
          <div class="form-group">
            <input type="text" name="first_name" id="first_name" class="form-control input-sm floatlabel" placeholder="First Name" />
          </div>
        </div>
        
        <div class="col-xs-6 col-sm-6 col-md-6 mb-4">
          <div class="form-group">
            <input type="text" name="last_name" id="last_name" class="form-control input-sm" placeholder="Last Name" />
          </div>
        </div>

      </div>

      <div class="form-group mb-4">
        <input type="email" name="email" id="email" class="form-control input-sm" placeholder="Email Address" />
      </div>
      
      <input type="submit" value="Signup" class="btn btn-primary btn-block" />
    
    </form>
  )
}

export default SignupForm