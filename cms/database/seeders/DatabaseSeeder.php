<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            SettingSeeder::class,
            ExpertiseSeeder::class,
            TechGroupSeeder::class,
            SocialLinkSeeder::class,
            ProjectSeeder::class,
            CreativeWorkSeeder::class,
            CertificateSeeder::class,
            TestimonialSeeder::class,
        ]);
    }
}
