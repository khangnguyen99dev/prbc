<?php 

namespace App\Services;

use Aws\S3\S3Client;
use Illuminate\Support\Facades\Storage;

class DigitalOceanSpacesService
{
    /**
     * Returns the signed digital ocean spaces image
     *
     * @param   string  $image
     *
     * @return  Mixed
     */
    public static function getSignedUrl($image)
    {
        if(empty($image)) {
            return null;
        }

        $cdnUrl = 'https://cdn-primary.cityfamily.citycloudmm.com/'.$image;

        return $cdnUrl;
    }
}
