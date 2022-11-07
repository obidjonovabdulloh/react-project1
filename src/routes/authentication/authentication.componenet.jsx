import SingUpForm from  "../../components/sing-up-form/sing-up-form.componenet"
import SingInForm from "../../components/sing-in-form copy/sing-in-form.componenet"
import "../authentication/authentication.styles.scss"

const Authentication = () => {
    return(
        <div className="authentication-container">
            <SingInForm /> 
            <SingUpForm />
        </div>
    );
}

export default Authentication;