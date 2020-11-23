<script>
    import {CognitoUserPool,CognitoUserAttribute,CognitoUser,AuthenticationDetails} from "../../node_modules/amazon-cognito-identity-js";
    import { goto } from '@sapper/app';
    import { token } from "./store";
    let displayData = "";
    let text = "Sign In";
    const poolData = {
    UserPoolId: "ap-south-1_XoSVXEE6X",
    ClientId: "1gnasru3ip9m5fsonvakbc58te"
    };
    let userLoggedIn = false;
    const pool_region = "ap-south-1";
    const userPool = new CognitoUserPool(poolData);
    const login = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };
    let signup = true;
    const validate = async () => {
        if (signup) {
            try {
                if (login.password === login.confirmPassword) {
                    const email = {
                        Name: "email",
                        Value: login.email,
                    };
                    const name = {
                        Name: 'name',
                        Value: login.name
                    }
                    const nameAttribute = new CognitoUserAttribute(name)
                    const emailAttribute = new CognitoUserAttribute(email);
                    userPool.signUp(
                        login.email,
                        login.password,
                        [emailAttribute , nameAttribute],
                        null,
                        (err, data) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(data.user);
                            }
                        }
                    );
                } else {
                    displayData = "Password and Confirm Password do not match";
                }
            } catch (error) {
                console.log(error);
            } 
            finally {
                const div = document.getElementById("displayData");
                displayData = "Verify your email";
                div.innerHTML = displayData;
                div.classList.add("displayData");
                text = "Sign in";
                signup = false
                //[login.email, login.password, login.confirmPassword] = ["","",""];
            }
        } else {
            const start = new Date().getTime()
            try {
                const loginDetails = {
                    Username: login.email,
                    Password: login.password 
                }
                const authenticationDetails = new AuthenticationDetails(loginDetails);
                const userDetail = {
                    Username: login.email,
                    Pool: userPool
                }
                const cognitoUser = new CognitoUser(userDetail);
                    cognitoUser.authenticateUser(authenticationDetails, {
                        onSuccess: data=>{  
                        // console.log(data)
                            token.set(data);
                            localStorage.setItem('token',token)
                            goto('/');
                            console.log(new Date().getTime() - start, 'ms')
                        //res.json(data)
                    },
                        onFailure: data =>{
                        console.log(data)
                        displayData = data.message
                        //res.json(data);
                    }
                })
            } 
            catch (error) {
                console.log(error);
            } 
        }
    };
    const switchToSignIn = () => {
        signup = !signup;
        text = !signup ? "Sign Up" : "Sign In";
    };
</script>

<style>
    form {
        padding: 10px;
        margin: 10px;
    }
    div {
        width: 100px;
        margin: 10px;
    }
    label {
        display: inline;
    }
    button {
        margin: 10px;
    }
    :global(.displayData) {
        width: auto !important;
        color: red;

    }
</style>



<h1>Please SignIn or Signup to continue</h1>
<div id="displayData" class="displayData">{displayData}</div>
<form>
    {#if signup}
        <div>
            <label for="name">Name</label>
            <input
                type="text"
                name="name"
                bind:value={login.name} />
        </div>
    {/if}
    <div>
        <label for="email">Email</label>
        <input type="text" name="email" bind:value={login.email} />
    </div>
    <div>
        <label for="password">Password</label>
        <input type="password" name="password" bind:value={login.password} />
    </div>
    {#if signup}
        <div>
            <label for="confirmPassword">Confirm Password</label>
            <input
                type="password"
                name="Confirmpassword"
                bind:value={login.confirmPassword} />
        </div>
    {/if}
    <button on:click|preventDefault={switchToSignIn}>Switch to {text} </button>
    <button on:click|preventDefault={validate}>Submit</button>
</form>