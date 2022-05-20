import React from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [signInWithGoogle, gUser,gLoading,gError] = useSignInWithGoogle(auth);
    const [
      signInWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useSignInWithEmailAndPassword(auth);
    let signError;
    if (error || gError){
        signError= <p className="text-red-500"> <small> {error?.message ||gError?.message} </small> </p>
     }
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm();
      const navigate = useNavigate();

     if (user || gUser){
       navigate('/')
     }
    const onSubmit = (data) => {
        console.log(data);
        signInWithEmailAndPassword(data.email,data.password)
      }
    
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="text-center text-2xl font-bold">Login</h2>
    
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="input input-bordered w-full max-w-xs"
                    {...register("email", {
                      pattern: {
                        value: /[A-Za-z]{3}/,
                        message: "Provide a Valid Email",
                      },
                      required: {
                        value: true,
                        message: "Email is Required",
                      },
                    })}
                  />
                  <label className="label">
                    {errors.email?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                    {errors.email?.type === "pattern" && (
                      <span className="label-text-alt text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                {signError}
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full max-w-xs"
                    {...register("password", {
                      minLength: {
                        value: 6,
                        message: "Password must be 6 character long",
                      },
                      required: {
                        value: true,
                        message: "Password is Required",
                      },
                    })}
                  />
                  <label className="label">
                    {errors.password?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span className="label-text-alt text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                  </label>
                </div>
                
                {signError}
                <input
                  className="btn  w-full max-w-xs "
                  type="submit"
                  value={"login"}
                />
        <p>
           <small>
             New to Doctors Portal? <Link className="text-primary" to={'/signup'}> Create an account now </Link>
        </small>
        </p>
    
              </form>
    
              <div className="divider">OR</div>
              <button
                onClick={() => signInWithGoogle()}
                className="btn btn-outline"
              >
                Continue With Google
              </button>
            </div>
          </div>
        </div>
      );
    };
    
export default Login;