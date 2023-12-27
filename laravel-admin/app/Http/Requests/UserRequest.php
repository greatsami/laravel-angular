<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
     * @return array
     */
    public function rules(): array
    {
        switch ($this->method()) {
            case 'POST':
                $arr = [
                    'first_name' => ['required'],
                    'last_name' => ['required'],
                    'email' => ['required', 'email'],
                    'password' => ['required'],
                ];
            case 'PUT':
            case 'PATCH':
                $arr = [
                    'first_name' => ['required'],
                    'last_name' => ['required'],
                    'email' => ['required', 'email'],
                    'password' => ['nullable'],
                ];
            default:
                break;
        }

        return $arr;
    }
}
