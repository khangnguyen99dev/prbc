<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class CurrencyRequest extends FormRequest
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
            'name' => 'required|unique:currencies,name,'.$id.',id,deleted_at,NULL',
            'code' => 'required|unique:currencies,code,'.$this->id.',id,deleted_at,NULL',
            'rate' => 'required',
            'symbol' => "required",
            'decimal_mark' => ["required", "different:thousands_separator", function(string $attribute, mixed $value, \Closure $fail) {
                if ($value == "," || $value == ".") {
                    return;
                }
        
                $fail('Only comma or dot is allowed for decimal mark');
            }],
            'thousands_separator' => ["required", "different:decimal_mark", function(string $attribute, mixed $value, \Closure $fail) {
                if ($value == "," || $value == ".") {
                    return;
                }
        
                $fail('Only comma or dot is allowed for thousand separator');
            }],
        ];
    }
}
