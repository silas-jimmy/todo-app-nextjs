<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['title', 'description', 'date', 'time'])]
class Todo extends Model
{
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'completed' => 'boolean',
        ];
    }

    /**
     * Gets the user that owns the todo task.
     * 
     * @return BelongsTo todo task User.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Gets the category the todo task belongs to.
     * 
     * @return BelongsTo todo task Category.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
