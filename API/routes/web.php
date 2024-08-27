<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\v1\CitiesController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return [
        'app' => 'Washing API By Initappz',
        'version' => '1.0.0',
    ];
    // return view('hellotest');
});

Route::get('/testing', [CitiesController::class, 'getAll']);

Route::get('/linkcreate', function () {
    $storagePath = storage_path('app/public');
    $publicPath = public_path('storage');

    if (!file_exists($publicPath)) {
        if (symlink($storagePath, $publicPath)) {
            return 'Link created successfully.';
        } else {
            return 'Failed to create link.';
        }
    } else {
        return 'Link already exists.';
    }
});

Route::get('/deleteNcreate', function () {
    $storagePath = storage_path('app/public');
    $publicPath = public_path('storage');

    if (file_exists($publicPath)) {
        // Check if it's not a symlink
        if (!is_link($publicPath)) {
            // Recursively delete the directory and its contents
            $files = new \RecursiveIteratorIterator(
                new \RecursiveDirectoryIterator($publicPath, \RecursiveDirectoryIterator::SKIP_DOTS),
                \RecursiveIteratorIterator::CHILD_FIRST
            );

            foreach ($files as $fileinfo) {
                $todo = ($fileinfo->isDir() ? 'rmdir' : 'unlink');
                $todo($fileinfo->getRealPath());
            }

            rmdir($publicPath); // Now remove the directory itself
        }
    }

    // Now try to create the symlink
    if (symlink($storagePath, $publicPath)) {
        return 'Link created successfully.';
    } else {
        return 'Failed to create link.';
    }
});