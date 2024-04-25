CREATE TABLE `authorization_codes` (
    `id` int NOT NULL AUTO_INCREMENT, `encrypted_code` varchar(255) NOT NULL, `is_used` tinyint(1) NOT NULL DEFAULT '0', `role` tinyint NOT NULL DEFAULT '0' COMMENT '0: Normal User, 1: VIP, 2: Admin', PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci