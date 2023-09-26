import React from 'react';
import { Layout } from '../components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';

const ContactUsPage = () => (
  <Layout title="Contact Us - SDG AI Lab">
    <section
      className="clean-block clean-form dark"
      style={{ padding: '80px' }}
    >
      <div className="container" style={{ color: 'var(--gray-dark)' }}>
        <div className="block-heading">
          <div className="intro" style={{ color: 'var(--gray-dark)' }}>
            <h2 className="text-center">
              <br />
              <strong>Contact Us</strong>
            </h2>
            <p style={{ color: 'var(--gray-dark)' }}>
              For questions or feedback, please contact us by using the form
              below. We'll get back to you soon as possible.
            </p>
            <div id="contact"></div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: '#fff',
          width: '50%',
          margin: '0 auto',
          padding: '20px',
        }}
      >
        <form
          id="contactForm"
          action="MAILTO:sdgailab@undp.org"
          method="post"
          enctype="text/plain"
        >
          <input className="form-control" type="hidden" id="Name" />
          <input className="form-control" type="hidden" id="Email" />
          <input className="form-control" type="hidden" />
          <div className="row">
            <div className="col-md-6">
              <div id="successfail"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-xl-12" id="message">
              <div
                className="has-feedback form-group mb-3"
                style={{ display: 'flex', gap: '20px' }}
              >
                <label className="form-label" for="from_name">
                  Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="from_name"
                  tabindex="-1"
                  name="from_name"
                  required=""
                  placeholder="Full Name"
                />
              </div>
              <div
                className="has-feedback form-group mb-3"
                style={{ display: 'flex', gap: '20px' }}
              >
                <label className="form-label" for="from_email">
                  Email
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="from_email"
                  name="from_email"
                  required=""
                  placeholder="Email Address"
                />
              </div>
              <div
                className="form-group mb-3"
                style={{ display: 'flex', gap: '60px' }}
              >
                <label className="form-label" for="comments"></label>
                <textarea
                  className="form-control"
                  id="comments"
                  name="Comments"
                  placeholder="Enter comments here"
                  rows="8"
                ></textarea>
              </div>
              <div className="form-group mb-3">
                <button
                  className="btn btn-primary d-block"
                  type="submit"
                  style={{
                    width: '40%!important',
                    margin: '0 auto',
                    backgroundColor: 'var(--undp_blue)',
                    border: 'none',
                  }}
                >
                  Send <i className="fa fa-chevron-circle-right"></i>
                  <FontAwesomeIcon icon={faCircleChevronRight} size="1x" />
                </button>
              </div>
              <hr />
            </div>
          </div>
        </form>
      </div>
    </section>
  </Layout>
);

export default ContactUsPage;
