"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "react-feather";
import authService from "@/services/auth.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";

// import Swal from 'sweetalert2'

function register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    username: "",
    password: "",
  });

  const handleToggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (formData) => {
    const data = await authService.signUp(formData);
    if (data?.status === 200) {
      toast.success(data?.data?.message);
      router.push("/auth/login");
    }
    if (data?.response?.status === 409) {
      toast.warning(data?.response?.data?.message);
    }
    if (data?.response?.status === 400) {
      toast.error(data?.response?.data?.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-screen">
      <div className="bg-white p-4 shadow rounded">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Controller
              control={control}
              name="username"
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    id="username"
                    placeholder="Username"
                    type="text"
                    onChange={(val) => {
                      field.onChange(val);
                    }}
                  />
                  {errors.username && (
                    <small className="text-danger">
                      {errors.username.message}
                    </small>
                  )}
                </>
              )}
            />
          </FormGroup>
          <br />
          <FormGroup>
            <Label for="password">Password</Label>
            <div className="position-relative" style={{ height: "44px" }}>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be 8 characters long",
                  },
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id="password"
                      placeholder="Password"
                      onChange={(val) => {
                        field.onChange(val);
                      }}
                      type={showPassword ? "text" : "password"}
                    />
                    {errors.password && (
                      <small className="text-danger">
                        {errors.password.message}
                      </small>
                    )}
                  </>
                )}
              />
              {showPassword ? (
                <EyeOff
                  className="position-absolute top-50 end-2 translate-middle-y cursor-pointer w-4 h-4"
                  onClick={handleToggleShowPassword}
                />
              ) : (
                <Eye
                  className="position-absolute top-50 end-2 translate-middle-y cursor-pointer w-4 h-4"
                  onClick={handleToggleShowPassword}
                />
              )}
            </div>
          </FormGroup>
          <br />
          <div className="flex justify-center items-center mb-4 mt-4">
            <Button outline color="primary" type="submit">
              Login
            </Button>
          </div>
          <p
            className="mt-12 text-center"
            style={{
              fontSize: "14px",
              color: "#616161",
              marginTop: "10px",
            }}
          >
            <Link href="/auth/register" className="no-underline">
              <small className="text-slate-500">
                Haven't registered yet? Please register here.
              </small>
            </Link>
          </p>
          <ToastContainer />
        </Form>
      </div>
    </div>
  );
}

export default register;
