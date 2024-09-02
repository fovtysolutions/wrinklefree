<?php 
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    /**
     * Add amount to a user's wallet.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function addAmount(Request $request, $userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $amount = $request->input('amount');

        // Add the specified amount to the user's wallet
        $user->deposit($amount);

        return response()->json([
            'message' => 'Amount added successfully',
            'balance' => $user->balance
        ]);
    }

    /**
     * Get the transaction history of a user's wallet.
     *
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTransactionHistory($userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $transactions = $user->transactions()->get();

        return response()->json([
            'transactions' => $transactions
        ]);
    }
}
