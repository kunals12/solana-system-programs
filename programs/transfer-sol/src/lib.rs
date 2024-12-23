use anchor_lang::{prelude::*, system_program};

declare_id!("gCpJUKGtsRubvHqpYLQyvgTQMo5z8gaf8Y2EAHb1Vvx");

#[program]
pub mod transfer_sol {
    use super::*;

    pub fn transfer(ctx: Context<Transfer>, amount: u64) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.from.to_account_info(),
                    to: ctx.accounts.to.to_account_info(),
                },
            ),
            amount,
        )?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Transfer<'info> {
    pub from: Signer<'info>,
    pub to: SystemAccount<'info>,
    pub system_program: Program<'info, System>,
}
