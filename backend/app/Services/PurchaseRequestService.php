<?php 

namespace App\Services;

use App\Models\PurchaseRequest;

class PurchaseRequestService
{
    /**
     * Returns the auto generate purchase request number
     * @return  string
     */
    public static function getAutoGeneratePRNumber()
    {
        $lastPR = PurchaseRequest::orderBy('id', 'desc')->first();

        if (!empty($lastPR)) {
            $lastPRNumber = $lastPR->pr_number;
            $lastPRNumber = explode('-', $lastPRNumber);
            $lastPRNumber = $lastPRNumber[1];
            $lastPRNumber = intval($lastPRNumber);
            $lastPRNumber++;
        } else {
            $lastPRNumber = 1;
        }

        return "PR-" . str_pad($lastPRNumber, 10, '0', STR_PAD_LEFT);
    }

    public static function levelSetup()
    {
        $totalLevel = 3;
        $optionLevels = [];

        for ($i = 1; $i <= $totalLevel; $i++) {
            $optionLevels[] = [
                'id' => $i,
                'label' => 'Level ' . $i,
            ];
        }

        return [
            'error' => false,
            'total_level' => $totalLevel,
            'option_levels' => $optionLevels
        ];
    }
}
