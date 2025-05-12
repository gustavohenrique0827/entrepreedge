
import { supabase } from '@/integrations/supabase/client';
import { PostgrestQueryBuilder } from '@supabase/postgrest-js';

export interface UserProfile {
  id: string;
  user_id: string;
  segment?: string;
  company_name?: string;
  company_cnpj?: string;
  created_at?: string;
}

// Type for the Supabase user_profiles table
type UserProfileTable = {
  id: string;
  user_id: string;
  segment: string | null;
  company_name: string | null;
  company_cnpj: string | null;
  created_at: string;
}

/**
 * Safely retrieves a user's profile by user ID
 * This function is a workaround for TypeScript errors related to unknown database schema
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    // Cast directly to any to bypass TypeScript's checks completely
    const queryBuilder = (supabase.from('user_profiles') as any);
    
    const { data, error } = await queryBuilder
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
    // Cast directly to any
    const queryBuilder = (supabase.from('user_profiles') as any);
    
    const { error } = await queryBuilder
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
    // Cast directly to any
    const queryBuilder = (supabase.from('user_profiles') as any);
    
    const { data, error } = await queryBuilder
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
