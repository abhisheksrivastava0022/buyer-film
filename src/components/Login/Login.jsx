import React from 'react'
import iffi from "../../assets/img/iffi.png"
import filmbazaar from "../../assets/img/filmbazaar.png"

const Login = () => {
    return (
        <>
            <div class="container">
                <div class="form-header">
                    <div class="logo text-center"><img src={filmbazaar} alt="logo" width="100" /></div>
                    <div><img src={iffi} alt="logo" width="100" /></div>
                </div>
                <div class="col-md-12">
                    <div class="card mt-4 mb-4">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 bluebg">
                                    <div class="px-3">
                                        <h1 class="bluetxt"> Welcome to the Film Bazaar Seller Portal!</h1>
                                        <p>
                                            We're thrilled to have you here. This platform is designed to connect talented filmmakers and sellers like you with the vibrant film community.

                                            As a seller, you have the opportunity to showcase your projects, network with industry professionals, and discover exciting collaborations. Your contributions are vital to the growth and diversity of our film ecosystem.

                                            Get started by logging in below. If you have any questions, our support team is here to help!
                                            Happy Selling!
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-6  form-pg">
                                    <div class="px-5 pt-4 pb-4">
                                        <h2 class="mt-3 pb-4">Login to your account</h2>
                                        <form>
                                            <div class="form-group ">
                                                <label>Email</label>
                                                <input type="email" name="email" class="form-control" placeholder="Enter Email" required="" aria-required="true" />
                                            </div>
                                            <div class="form-group">
                                                <label>Password</label>
                                                <input type="password" name="" class="form-control" placeholder="*******" required="" aria-required="true" />
                                            </div>
                                            <div class="form-group">
                                                <input class="form-check-input" type="checkbox" value="" id="" />
                                                <label class="form-check-label" for="">&nbsp;
                                                    Remember me
                                                </label>
                                            </div>
                                            <div class="form-group">
                                                <button class="btn btn-primary btn-yellow">Submit</button>
                                            </div>
                                            <div class="form-group">
                                                <div>  <a href=""> Create new account</a></div>
                                                <div>   <a href=""> Forgot your password?</a></div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid footer bg-dark " >
                <div class="container ">
                    <div class="text-center footer-copyright">
                        <span class="text-light">
                            <a href="#" class="text-secondary">
                                All right reserved,   Copyright© Powered by Film Bazzar.
                            </a></span><a href="#" class="text-secondary">
                        </a>
                    </div>
                    <a href="#" class="text-secondary">
                    </a>
                </div>
                <a href="#" class="text-secondary">
                </a>
            </div>
        </>
    )
}

export default Login