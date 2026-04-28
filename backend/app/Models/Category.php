<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['label', 'value', 'description'])]
class Category extends Model
{
    /**
     * Gets all the todo tasks for a category.
     * 
     * @return HasMany category's Todo tasks.
     */
    public function todos(): HasMany
    {
        return $this->hasMany(Todo::class);
    }
}
