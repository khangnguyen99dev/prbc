<?php

namespace App\Http\Requests\WorkSpace;

use Illuminate\Foundation\Http\FormRequest;

class PurchaseRequestRequest extends FormRequest
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
            'pr_name' => 'required|string|max:255',
            'entity_id' => 'required|exists:entities,id',
            'currency' => 'required',
            'pr_number' => 'required|string|max:30|unique:purchase_requests,pr_number,'.$this->id.',id,deleted_at,NULL',
            'pr_date' => 'required|date',
            'pr_description' => 'nullable|string',
            'approval_level_required' => 'required|integer|min:1',

            'approver_users_selected' => 'required',
            'approver_users_selected.*.level' => 'required|integer|min:1',
            'approver_users_selected.*.approver_user_id' => 'required',
            'items' => 'required',
            'items.*.item_code' => 'required|string|max:255',
            'items.*.item_name' => 'required|string|max:255',
            'items.*.item_description' => 'required|string|max:255',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0.01',
            'items.*.total_price' => 'required|numeric|min:0.01',
            'items.*.uom' => 'required|string|max:255',
            'items.*.required_by' => 'required|date',
        ];
    }

    public function attributes(): array
    {
        return [
            'entity_id' => 'entity',
            'approval_level_required' => 'level',
            'approver_users_selected.*.approver_user_id' => 'approver level :position',
            'items.*.item_code' => 'item code at item :position',
            'items.*.item_name' => 'item name at item :position',
            'items.*.item_description' => 'item description at item :position',
            'items.*.quantity' => 'quantity at item :position',
            'items.*.unit_price' => 'unit price at item :position',
            'items.*.total_price' => 'total price at item :position',
            'items.*.uom' => 'uom at item :position',
            'items.*.required_by' => 'required by at item :position',
        ];
    }

    public function messages(): array
    {
        return [
            'approver_users_selected.*.approver_user_id' => 'The approver level :position field is required.',
        ];
    }
}
