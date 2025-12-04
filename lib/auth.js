// lib/auth.js
import { supabase } from './supabaseClient.js';

/**
 * Signs up a new user.
 * By default, Supabase Auth requires email confirmation.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {string} name - The user's full name for their profile.
 * @returns {Promise<{ user: User | null, error: Error | null }>}
 */
export async function signUpNewUser(email, password, name) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      // You can pass additional data to be stored in the user's metadata.
      // This can be used by a database trigger to create the user's profile.
      data: {
        full_name: name,
      }
    }
  });

  if (error) {
    console.error('Error signing up:', error.message);
    return { user: null, error };
  }

  console.log('Sign up successful, user needs to confirm email.');
  return { user: data.user, error: null };
}

/**
 * Signs in an existing user with email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<{ session: Session | null, error: Error | null }>}
 */
export async function signInWithPassword(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error('Error signing in:', error.message);
    return { session: null, error };
  }

  console.log('Sign in successful!');
  return { session: data.session, error: null };
}

/**
 * Signs out the currently logged-in user.
 * @returns {Promise<{ error: Error | null }>}
 */
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error signing out:', error.message);
    } else {
        console.log('Signed out successfully!');
    }
    return { error };
}

/**
 * Signs in the user using Google's OAuth.
 * This will redirect the user to Google's sign-in page.
 */
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // You can specify a redirect URL here if needed,
      // otherwise it will use the one set in your Supabase dashboard.
      // redirectTo: 'http://localhost:3000/dashboard'
    }
  });

  if (error) {
    console.error('Error signing in with Google:', error.message);
  }
}

/**
 * Sends a password reset link to the user's email.
 * The user will be redirected to the specified URL after clicking the link.
 * @param {string} email The user's email address.
 * @returns {Promise<{ error: Error | null }>}
 */
export async function sendPasswordResetEmail(email) {
  // The redirectTo URL is where the user will be sent after they click the password reset link in their email.
  // You will need to create a page at this route to handle the password update.
  const redirectTo = `${window.location.origin}/update-password`;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo,
  });

  if (error) {
    console.error('Error sending password reset email:', error.message);
  }

  return { error };
}