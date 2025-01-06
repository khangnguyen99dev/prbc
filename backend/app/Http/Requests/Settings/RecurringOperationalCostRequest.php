<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class RecurringOperationalCostRequest extends FormRequest
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
        $id = !empty($this->id) ? $this->id : "NULL";
        return [
            'entity_id' => 'required|exists:entities,id',
            'cost_amount_in_local_currency' => 'required|numeric|min:0.01',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:recurring_operational_costs,code,'.$this->id.',id,deleted_at,NULL',
            'active' => 'required|in:0,1',
            'date_active' => 'required_if:active,1|date',
            // 'description' => 'nullable|string',
        ];
    }

    public function attributes(): array
    {
        return [
            'entity_id' => 'entity',
        ];
    }

    public function messages(): array
    {
        return [
            // 'entity_id.required' => 'The entity field is required.',
        ];
    }
}
