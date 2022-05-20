import React from "react";
import {useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
// import Loading from "../Shared/Loading";
import { Link, useNavigate } from "react-router-dom";
// import useToken from "../../hooks/useToken";
// import { toast } from "react-toastify";

const SignUp = () => {
    const [signInWithGoogle, gUser,gLoading,gError] = useSignInWithGoogle(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

      const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    //   const [token]= useToken(user || gUser)
//
  const navigate = useNavigate()
  let signError;
  //
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  if(user||gUser){
      navigate('/')
  }

//   if (token) {
//     console.log(user,gUser);
//     navigate('/appointment')
//   }
  
//   if (loading || gLoading ||updating){
//     return <Loading />
//   }

  if (error || gError ||updateError){
     signError= <p className="text-red-500"> <small> {error?.message ||gError?.message} || {updateError?.message} </small> </p>
  }

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email,data.password,data.name);
    await updateProfile({ displayName: data.name });
    console.log(data.name)
    // toast('Updated profile');
   
  }
    return (
        <div className="flex justify-center items-center h-screen">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold">Sign Up</h2>
  
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full max-w-xs"
                  {...register("name", {
                   
                    required: {
                      value: true,
                      message: "Name is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                  
                </label>
              </div>
               
              

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
                value={"Sign Up"}
              />
      <p>
         <small>
          Already have an account? <Link className="text-primary" to={'/login'}> Please Login </Link>
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

export default SignUp;