-- CreateTable
CREATE TABLE "CommandAnalysis" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT DEFAULT 'anonymous',
    "command" TEXT NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "ghostCommentary" TEXT,
    "saferAlternative" TEXT,
    "components" JSONB,
    "consequences" JSONB,
    "affectedResources" JSONB,
    "reasons" JSONB,
    "matchedRules" JSONB,
    "modelMetadata" JSONB,
    "isDeterministicOnly" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommandAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedExample" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "command" TEXT NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedExample_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CommandAnalysis_sessionId_idx" ON "CommandAnalysis"("sessionId");

-- CreateIndex
CREATE INDEX "CommandAnalysis_riskLevel_idx" ON "CommandAnalysis"("riskLevel");

-- CreateIndex
CREATE INDEX "CommandAnalysis_createdAt_idx" ON "CommandAnalysis"("createdAt");

-- CreateIndex
CREATE INDEX "SavedExample_riskLevel_idx" ON "SavedExample"("riskLevel");
