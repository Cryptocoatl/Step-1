
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { awardTokens } from "../rewardsService";
import { Wallet } from "./types";

// Function to connect a wallet
export const connectWallet = async (
  walletAddress: string,
  walletType: string,
  chainType: string
): Promise<boolean> => {
  try {
    // First, check if this wallet is already connected
    const { data: existingWallet } = await supabase
      .from('user_wallets')
      .select()
      .eq('wallet_address', walletAddress)
      .eq('chain_type', chainType)
      .single();
    
    if (existingWallet) {
      console.log(`Wallet ${walletAddress} already connected`);
      return true; // We consider this a success since the wallet is already connected
    }
    
    // Get current user ID
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Connect the wallet by inserting into database with user_id from auth
    const { error } = await supabase
      .from('user_wallets')
      .insert({
        user_id: user.id,
        wallet_address: walletAddress,
        wallet_type: walletType,
        chain_type: chainType
      });
    
    if (error) throw error;
    
    // Award STEP1 tokens only if this is not an automatic connection
    // The auto-generated wallet rewards are handled separately
    if (walletType !== 'Smart Wallet') {
      await awardTokens(
        'wallet_connect',
        5,
        `Reward for connecting your ${chainType.toUpperCase()} wallet`
      );
      
      toast({
        title: 'Wallet Connected Successfully',
        description: `Your ${chainType.toUpperCase()} wallet has been linked to your STEP1 account.`
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error connecting wallet:', error);
    toast({
      title: 'Wallet Connection Failed',
      description: 'There was an error connecting your wallet. Please try again.',
      variant: 'destructive'
    });
    return false;
  }
};

// Function to disconnect a wallet
export const disconnectWallet = async (walletId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_wallets')
      .delete()
      .eq('id', walletId);
    
    if (error) throw error;
    
    toast({
      title: 'Wallet Disconnected',
      description: 'Your wallet has been disconnected from your STEP1 account.'
    });
    
    return true;
  } catch (error) {
    console.error('Error disconnecting wallet:', error);
    toast({
      title: 'Wallet Disconnection Failed',
      description: 'There was an error disconnecting your wallet. Please try again.',
      variant: 'destructive'
    });
    return false;
  }
};
