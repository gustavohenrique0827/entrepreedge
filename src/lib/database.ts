
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  user_id: string;
  segment?: string;
  company_name?: string;
  company_cnpj?: string;
  created_at?: string;
}

/**
 * Safely retrieves a user's profile by user ID
 * This function is a workaround for TypeScript errors related to unknown database schema
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    // Using a generic query approach to safely fetch data
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    return data as UserProfile;
  } catch (err) {
    console.error('Error in getUserProfile:', err);
    return null;
  }
}

/**
 * Updates a user's profile information
 */
export async function updateUserProfile(profile: Partial<UserProfile> & { user_id: string }): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .upsert([profile], { onConflict: 'user_id' });
    
    if (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error in updateUserProfile:', err);
    return false;
  }
}

/**
 * Creates a new user profile
 */
export async function createUserProfile(profile: Omit<UserProfile, 'id' | 'created_at'>): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([profile])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating user profile:', error);
      return null;
    }
    
    return data as UserProfile;
  } catch (err) {
    console.error('Error in createUserProfile:', err);
    return null;
  }
}
