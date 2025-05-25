  //import Admin from '../models/Admin.js';
  import transporter from '../config/mailer.js';
  import bcrypt from 'bcrypt';
  import Admin from '../models/ResetPasswordAdmin.js';

  // ✅ Send OTP to Admin Email
  export const forgotPassword = async(req, res) => {
      const { email } = req.body;

      try {
          const admin = await Admin.findOne({ email: email.toLowerCase() });
          if (!admin) return res.status(404).json({ message: 'Admin not found' });

          const otp = Math.floor(100000 + Math.random() * 900000).toString();
          const otpExpires = Date.now() + 10 * 60 * 1000;

          admin.otp = otp;
          admin.otpExpires = otpExpires;
          await admin.save();

          try {
              await transporter.sendMail({
                  from: process.env.EMAIL,
                  to: email,
                  subject: 'OTP for Admin Password Reset',
                  html: `<p>Your OTP is <b>${otp}</b>. It will expire in 10 minutes.</p>`
              });
              res.json({ message: 'OTP sent to your email' });
          } catch (mailError) {
              console.error('Email send error:', mailError);
              res.status(500).json({ message: 'Failed to send OTP email' });
          }

      } catch (error) {
          console.error('Forgot Password Error:', error);
          res.status(500).json({ message: 'Server error' });
      }
  };

  // ✅ Verify OTP
  export const verifyOtp = async(req, res) => {
      const { email, otp } = req.body;

      try {
          const admin = await Admin.findOne({ email });
          if (!admin || admin.otp !== otp || admin.otpExpires < Date.now()) {
              return res.status(400).json({ message: 'Invalid or expired OTP' });
          }

          res.json({ message: 'OTP verified' });
      } catch (error) {
          console.error('Verify OTP Error:', error);
          res.status(500).json({ message: 'Server error' });
      }
  };

  // ✅ Reset Password
  export const resetPassword = async(req, res) => {
      const { email, otp, newPassword } = req.body;

      try {
          const admin = await Admin.findOne({ email });
          if (!admin || admin.otp !== otp || admin.otpExpires < Date.now()) {
              return res.status(400).json({ message: 'Invalid or expired OTP' });
          }

          const hashedPassword = await bcrypt.hash(newPassword, 10);

          admin.password = hashedPassword;
          admin.otp = null;
          admin.otpExpires = null;
          await admin.save();

          res.json({ message: 'Password reset successful' });
      } catch (error) {
          console.error('Reset Password Error:', error);
          res.status(500).json({ message: 'Server error' });
      }
  };