import './Form.css'

export default function Form(props){
    const { submit, change, disabled, errors, values } = props;

    const onSubmit = evt => {
        evt.preventDefault();
        submit();
    }

    const onChange = evt => {
        const { name, value, checked, type } = evt.target;
        const valueToUse = type ==="checkbox"? checked: value;
        change(name, valueToUse);
    }

    return (
        <form className="form-container" onSubmit={onSubmit}>
            <div className="input-container">
                <h2>Sign Up!</h2>
                <div className="error-messages">
                    <div>{errors.username}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.tOS}</div>
                </div>
            <label>Username
                <input
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={values.username}
                    onChange={onChange}
                 />
            </label>
            <label>Email
                <input
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={values.email}
                    onChange={onChange}
                 />
            </label>
            <label>Password
                <input
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={values.password}
                    onChange={onChange}
                 />
            </label>
            <br/>
            <h4>Pretend you read thoroughly</h4>
            <label>Terms of Service
                <input
                    type="checkbox"
                    name="tOS"
                    checked={values.tOS}
                    onChange={onChange}
                 />
            </label>
            <br/>
            <button disabled={disabled}>Join</button>
            </div>
        </form>
    )
}