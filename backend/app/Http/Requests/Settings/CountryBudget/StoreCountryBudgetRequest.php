<?php

namespace App\Http\Requests\Settings\CountryBudget;

use Illuminate\Foundation\Http\FormRequest;

class StoreCountryBudgetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        // $id = !empty($this->id) ? $this->id : "NULL";
        return [
            'country_id' => 'required|exists:countries,id',
            'currency' => 'required|string|max:255',
            'year' => 'required|integer|min:2000|max:2999',
            'monthly_amounts' => 'required',
            'monthly_amounts.*.amount' => 'required|numeric|min:0',
        ];
    }

    public function attributes(): array
    {
        return [
            'country_id' => 'country name',
            'monthly_amounts.*.amount' => 'amount at month :position',
        ];
    }

    public function messages(): array
    {
        return [
        ];
    }
}
